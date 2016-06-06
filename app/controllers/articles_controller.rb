class ArticlesController < ApplicationController
  layout "public"
  before_action :set_article, only: [:show, :edit, :update, :destroy]
  before_action :logged_in_user

  def good
    @article = Article.find(params[:id])
     respond_to do |format|
       if @article.update(good: 1)
         format.js
       end
     end
  end

  def canclegood
     @article = Article.find(params[:id])
     respond_to do |format|
       if @article.update(good: 0)
         format.js
       end
     end
  end

  def collection
    article = Article.find(params[:id])
    article.user_id = current_user.id
    if article.save
      render text: "已收藏"
    else
      render text: "收藏失败"
    end
  end

  # GET /articles
  # GET /articles.json
  def index
    @articles = Article.order(created_at: :desc).paginate(:page => params[:page], :per_page =>10)
  end

  # GET /articles/1
  # GET /articles/1.json
  def show
  end

  # GET /articles/new
  def new
    @article = Article.new
    @categroys = Categroy.all.select("id,name")
  end

  # GET /articles/1/edit
  def edit
  end

  # POST /articles
  # POST /articles.json
  def create
    @article = Article.new(article_params)
    @article.user_id = current_user.id

    if @article.save
      redirect_to root_path
    else
      format.html { render :new }
      format.json { render json: @article.errors, status: :unprocessable_entity }
    end
  end

  # PATCH/PUT /articles/1
  # PATCH/PUT /articles/1.json
  def update
    respond_to do |format|
      if @article.update(article_params)
        format.html { redirect_to @article, notice: 'Article was successfully updated.' }
        format.json { render :show, status: :ok, location: @article }
      else
        format.html { render :edit }
        format.json { render json: @article.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /articles/1
  # DELETE /articles/1.json
  def destroy
      @article.destroy
      redirect_to root_path
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_article
      @article = Article.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def article_params
      params.require(:article).permit(:title, :mood, :spell, :example, :mean, :categroy_id, :author)
    end


end
