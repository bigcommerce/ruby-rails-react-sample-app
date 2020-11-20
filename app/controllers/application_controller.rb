class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception
  before_action :set_header_for_iframe
  before_action :set_header_for_iframe

  private

  # require to remove X-Frame-Options to load Rails app in iframe on Bigcommerce
  def set_header_for_iframe
    response.headers.delete "X-Frame-Options"
  end

  def current_store
    @current_store || set_current_store
  end

  def set_current_store
    @current_store = Store.find_by(store_hash: params[:store_hash])
  end
end
