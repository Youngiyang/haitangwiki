class WelcomeController < ApplicationController
  layout "public"
  def index
    @articles = Article.order(created_at: :desc).paginate(:page => params[:page], :per_page => 16)
  end

  def classical
    @classicals = Article.order(created_at: :desc).paginate(:page => params[:page], :per_page => 16).where(good: 1)
  end

  def about

  end
end
