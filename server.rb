module  Hudson
	class Server < Sinatra::Base


		get "/" do 
			@key = ENV['PLACES_KEY']
			erb :index

		end 
		get "/places" do
			content_type :json
		  place = "airport"
		  key = ENV['PLACES_KEY']

			uri = URI.encode("https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=41.65053,-73.932648&radius=50000&type="+ place +"&key=" + key) 
      @location = HTTParty.get(uri).to_json 

    end

    post "/place" do
			content_type :json
		  place = params['type']
		  key = ENV['PLACES_KEY']
			uri = URI.encode("https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=41.65053,-73.932648&radius=50000&type="+ place +"&key=" + key) 
      @places = HTTParty.get(uri).to_json 
     		
    end
	end
end