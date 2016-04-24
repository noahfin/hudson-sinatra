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

    get "/photos/:photo_reference" do 
			
		  photo_reference = params['photo_reference']
		  key = ENV['PLACES_KEY']

		  # https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=CnRtAAAATLZNl354RwP_9UKbQ_5Psy40texXePv4oAlgP4qNEkdIrkyse7rPXYGd9D_Uj1rVsQdWT4oRz4QrYAJNpFX7rzqqMlZw2h2E2y5IKMUZ7ouD_SlcHxYq1yL4KbKUv3qtWgTK0A6QbGh87GB3sscrHRIQiG2RrmU_jF4tENr9wGS_YxoUSSDrYjWmrNfeEHSGSc3FyhNLlBU&key=YOUR_API_KEY
			uri = URI.encode("https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=" + photo_reference +"&key=" + key) 
      @places = HTTParty.get(uri)
      # FileUtils::touch '/public/uploads/' + photo_reference + ".png"
      Dir.chdir "public/uploads"
      # File.write(photo_reference + ".png", "")
  		File.open( photo_reference+".png", "w") do |f|
    	f.write(@places)
  		end
  		 Dir.chdir "../../"
  		return "The file was successfully uploaded!"

			   		
    end
		# Sinatra::Application.routes["POST"].each do |route|
		#   puts route[0]
		# end


	end
end