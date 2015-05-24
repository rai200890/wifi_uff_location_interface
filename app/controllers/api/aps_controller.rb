class Api::ApsController < ApplicationController

  def index
    @aps = Ap.all
  end
end