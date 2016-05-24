class WelcomeController < ApplicationController
  layout "public"
  before_action :logged_in_user

  def index
    @articles = Article.all
  end

  def freezer
    @collections = current_user.articles
  end
end
