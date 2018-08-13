class MapWorker
  include Sidekiq::Worker
  def perform(id)
    lambda_fn_name = ENV['LAMBDA_FN_NAME']
    bucket_name = ENV['AWS_BUCKET_NAME']

    map = Map.find(id)

    poster_filename = "#{SecureRandom.urlsafe_base64}.png"

    payload = {
      formatSize: 'DIN',
      mapId: 'cjkqod0by7xsc2rpju6kvos0x',
      lon: '7.617',
      lat: '51.960',
      bucketFile: poster_filename,
      title: 'Yoloswag'
    }.merge(arguments).to_json

    aws_lambda = Aws::Lambda::Client.new
    aws_s3 = Aws::S3::Resource.new

    aws_lambda.invoke(
      function_name: lambda_fn_name,
      payload: payload
    )

    bucket = aws_s3.bucket(bucket_name)
    raise 'Map has not been created' unless bucket.object(poster_filename).exists?

  end
end


#MapWorker.new.perform({})
