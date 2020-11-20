class Api::StoreDetailsController < ApplicationController
  skip_before_action :verify_authenticity_token
  before_action :set_bc_store

  def store_details
    store = Store.find(params[:store_id])
    store_info = Bigcommerce::StoreInfo.info
    store_variants = HTTParty.get(
      "https://api.bigcommerce.com/stores/#{store.store_hash}/v3/catalog/summary", headers: {
        "X-Auth-Token": store.access_token,
        "Content-Type" => "application/json"
      })
    render json: { status: true, store_info: store_info, store_inventory: store_variants }
  end

  def orders
    orders = Bigcommerce::Order.all
    orders = orders.map { |o| o unless o.is_deleted }
    render json: { status: true, orders: orders.compact }
  end

  def update_order
    Bigcommerce::Order.update(params[:order_id], {status_id: 5})
    render json: {status: true}
  end

  def delete_order
    Bigcommerce::Order.update(params[:order_id], { is_deleted: true })
    render json: { status: true }
  end

  private

  def set_bc_store
    store = Store.find(params[:store_id])
    Bigcommerce.configure do |config|
      config.store_hash = store.store_hash
      config.client_id = ENV['BC_CLIENT_ID']
      config.access_token = store.access_token
    end
  end
end
