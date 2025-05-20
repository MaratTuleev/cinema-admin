class FilmsController < ApplicationController
  def index
    render json: Film.all
  end
end