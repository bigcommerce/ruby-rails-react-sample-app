Rails.application.routes.draw do
  get '/auth/:name/callback', to: 'omniauths#callback'
  get '/load', to: 'omniauths#load'
  get '/uninstall', to: 'omniauths#uninstall'

  # API Routes
  namespace :api do
    get '/store_details', to: 'store_details#store_details'
    get '/orders', to: 'store_details#orders'
    put '/update_order', to: 'store_details#update_order'
    delete '/delete_order', to: 'store_details#delete_order'
  end
  root to: 'welcome#home'

  # Redirect all html requests to the root so they can be handled by javascript
  get '*path',
      to: 'welcome#index',
      constraints: ->(request) { !request.xhr? && request.format.html? }
end
