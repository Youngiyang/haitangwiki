class CategroysController < ApplicationController
  layout "admin"
  before_action :set_categroy, only: [:show, :edit, :update, :destroy]
  before_action :logged_in_user
  before_action :permission


  # GET /categroys
  # GET /categroys.json
  def index
    @categroys = Categroy.all
  end

  # GET /categroys/1
  # GET /categroys/1.json
  def show
  end

  # GET /categroys/new
  def new
    @categroy = Categroy.new
  end

  # GET /categroys/1/edit
  def edit
  end

  # POST /categroys
  # POST /categroys.json
  def create
    @categroy = Categroy.new(categroy_params)

    respond_to do |format|
      if @categroy.save
        format.html { redirect_to @categroy, notice: 'Categroy was successfully created.' }
        format.json { render :show, status: :created, location: @categroy }
      else
        format.html { render :new }
        format.json { render json: @categroy.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /categroys/1
  # PATCH/PUT /categroys/1.json
  def update
    respond_to do |format|
      if @categroy.update(categroy_params)
        format.html { redirect_to @categroy, notice: 'Categroy was successfully updated.' }
        format.json { render :show, status: :ok, location: @categroy }
      else
        format.html { render :edit }
        format.json { render json: @categroy.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /categroys/1
  # DELETE /categroys/1.json
  def destroy
    @categroy.destroy
    respond_to do |format|
      format.html { redirect_to categroys_url, notice: 'Categroy was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_categroy
      @categroy = Categroy.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def categroy_params
      params.require(:categroy).permit(:name)
    end
end
