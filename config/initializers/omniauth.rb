Rails.application.config.middleware.use OmniAuth::Builder do
  provider :bigcommerce, ENV['BC_CLIENT_ID'], ENV['BC_CLIENT_SECRET'],
           {
             scope: 'users_basic_information store_v2_products store_v2_information',
             client_options: {
               site: 'https://login.bigcommerce.com'
             }
           }
end
