class WelcomeController < ApplicationController
  layout "public"
  before_action :logged_in_user

  def index
    @articles = Article.paginate(:page => params[:page], :per_page => 1)
    @categroys = Categroy.all
  end

  def freezer
    @collections = current_user.articles.paginate(:page => params[:page], :per_page => 1)
  end

  def classical
    @classicals = Article.paginate(:page => params[:page], :per_page => 1).where(good: 1)
  end
end
