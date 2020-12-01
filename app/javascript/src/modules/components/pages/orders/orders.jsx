import React, { useState, useEffect } from 'react'
import {
  Button,
  Panel,
  Table,
  Text,
  Modal,
  AlertsManager,
  createAlertsManager,
  Badge
} from '@bigcommerce/big-design';
import { DeleteIcon } from '@bigcommerce/big-design-icons';

import Loader from '../../common/Loader';
import {ApiService} from "../../../../services/apiServices";
import { alertsManager } from "../../../../app";

export default function Order(props) {
  let {storeId} = props;

  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [currentOrder, setCurrentOrder] = useState('');
  const [currentStatus, setCurrentStatus] = useState('');
  const [orders, setOrders] = useState([]);

  //Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPageOptions] = useState([5, 10, 20, 30]);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [currentItems, setCurrentItems] = useState([]);

  const onItemsPerPageChange = (newRange) => {
    setCurrentPage(1);
    setItemsPerPage(newRange);
  };

  function updateOrder(id, newStatus){
    setCurrentOrder(orders.find(element => element.id == id));
    setCurrentStatus(newStatus);
    setIsOpen(true);
  }

  function handleUpdate(){
    setIsOpen(false);
    setLoading(true);
    ApiService.updateOrder({store_id: storeId, order_id: currentOrder.id, status: currentStatus})
      .then(function (response){
        let newOrders = orders
        let newOrder = orders.find(element => element.id == currentOrder.id)
        newOrder.status = currentStatus
        const findIndex = orders.findIndex( order => order.id === currentOrder.id);
        newOrders[findIndex] = newOrder;
        setOrders(newOrders);
        AddAlert('Order Update', 'Order Has Been Cancelled Successfully!', 'success')
        setLoading(false);
      })
      . catch(function (error) {
        console.log(error);
        AddAlert('Error', 'Something Went Wrong, Please Try Again!', 'error')
        setLoading(false);
      })
  }

  function handleDelete() {
    setIsDelete(false);
    setLoading(true);
    ApiService.deleteOrder({store_id: storeId, order_id: currentOrder.id})
      .then(function (response){
        let newOrders = orders
        newOrders = orders.filter(order => order.id !== currentOrder.id)
        setOrders(newOrders);
        AddAlert('Order Delete', 'Order Has Been Deleted Successfully!', 'success')
        setLoading(false);
      })
      . catch(function (error) {
        console.log(error);
        AddAlert('Error', 'Something Went Wrong, Please Try Again!', 'error')
        setLoading(false);
      })
  }

  function AddAlert(title, details, type) {
    const alert = {
      header: title,
      messages: [
        {
          text: details,
        },
      ],
      type: type,
      onClose: () => null,
      autoDismiss: true
    }
    alertsManager.add(alert);
  }

  function orderStatus(status){
    switch(status) {
      case 'Completed':
        return (<Badge variant="success" label={status}/>)
        break;
      case 'Awaiting Fulfillment':
        return (<Badge variant="secondary" label={status}/>)
        break;
      case 'Cancelled':
        return (<Badge variant="danger" label={status}/>)
        break;
      default:
        return (<Badge variant="secondary" label={status}/>)
    }
  }

  function orderUpdate(id, status){
    return(
      <>
        { !['Completed', 'Cancelled'].includes(status) &&
        <Button onClick={() => updateOrder(id, 'Cancelled')} actionType="destructive">Cancel</Button>
        }
      </>
    )
  }

  function renderOnDelete(id) {
    return(
      <Button
        variant="subtle"
        actionType="destructive"
        onClick={() => updateDeleteOrder(id)}
        iconOnly={<DeleteIcon title="Delete Product" />}
      />
    )}

  function updateDeleteOrder(id){
    setCurrentOrder(orders.find(element => element.id == id));
    setIsDelete(true);
  }

  useEffect(() => {
    ApiService.getOrders({store_id: storeId})
      .then(function (response) {
        setOrders(response.data.orders)
        setLoading(false);
        console.log(response)
      })
      .catch(function (error) {
        console.log(error);
      })
  }, []);

  useEffect(() => {
    const maxItems = currentPage * itemsPerPage;
    const lastItem = Math.min(maxItems, orders.length);
    const firstItem = Math.max(0, maxItems - itemsPerPage);

    setCurrentItems(orders.slice(firstItem, lastItem));
  }, [currentPage, itemsPerPage]);

  return(
    <>
      <AlertsManager manager={alertsManager} />
      { loading &&
      <Loader />
      }
      { !loading &&
      <Panel header="Orders ">
        <Table
          columns={[
            { header: 'Order ID', hash: 'id', render: ({ id }) => id },
            { header: 'Billing Name', hash: 'billing_address', render: ({ billing_address }) => billing_address.first_name },
            { header: 'Order Total', hash: 'subtotal_inc_tax', render: ({ subtotal_inc_tax }) => `$ ${Number(subtotal_inc_tax).toFixed(2)}` },
            { header: 'Order Status', hash: 'status', render:  ({ status }) => orderStatus(status) },
            { header: '', hash: 'id', render: ({ id, status }) => orderUpdate(id, status) },
            { header: '', hash: 'id', render: ({ id }) => renderOnDelete(id) },
          ]}
          items={orders}
          itemName="Orders"
          pagination={{
            currentPage,
            totalItems: orders.length,
            onPageChange: setCurrentPage,
            itemsPerPageOptions,
            onItemsPerPageChange,
            itemsPerPage,
          }}
          stickyHeader
        />
        <Modal
          actions={[
            { text: 'Cancel', variant: 'subtle', onClick: () => setIsOpen(false) },
            { text: 'Confirm', onClick: () => handleUpdate() },
          ]}
          header="Update Order"
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          closeOnEscKey={true}
          closeOnClickOutside={true}
        >
          <Text>
            Are you sure you want to mark {currentStatus} this order?
          </Text>
        </Modal>
        <Modal
          actions={[
            { text: 'Cancel', variant: 'subtle', onClick: () => setIsDelete(false) },
            { text: 'Delete', onClick: () => handleDelete() },
          ]}
          header="Delete Order"
          isOpen={isDelete}
          onClose={() => setIsDelete(false)}
          closeOnEscKey={true}
          closeOnClickOutside={true}
        >
          <Text>
            Do you really want to delete order with id # {currentOrder.id} ?
          </Text>
        </Modal>
      </Panel>
      }
    </>
  )
}
