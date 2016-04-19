module  Hudson
	class Server < Sinatra::Base


		get "/" do 
			@key = ENV['PLACES_KEY']
			erb :index

		end 
		get "/:places" do
			content_type :json
		  place = params[:location]
		  key = ENV['PLACES_KEY']
			uri = URI.encode("https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=41.65053,-73.932648&radius=50000&type=doctor&key=" + key) 
      @location = HTTParty.get(uri).to_json 
     

    end

    get "/:lat/:long" do
			content_type :json
		  place = params[:location]
		  key = ENV['PLACES_KEY']
			uri = URI.encode("https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=-33.8670522,151.1957362&radius=500&type=restaurant&name=cruise&key=" + key) 
      @places = HTTParty.get(uri).to_json 
     		erb :data
   
    end
	end
end