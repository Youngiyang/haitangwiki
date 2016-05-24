class AdminsController < ApplicationController
  layout "admin"
  before_action :logged_in_user

  def admin
    permission
  end

end
