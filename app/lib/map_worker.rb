class MapWorker
  include Sidekiq::Worker

  def perform(id)
    lambda_fn_name = ENV['LAMBDA_FN_NAME']
    bucket_name = ENV['AWS_BUCKET_NAME']

    map = Map.find(id)

    payload = {
      formatSize: 'DIN',
      mapStyle: 'cjkqod0by7xsc2rpju6kvos0x',
      lon: map.lon,
      lat: map.lat,
      bucketFile: map.filename,
      title: map.title,
      subtitle: map.subtitle,
      coords: map.coords
    }.to_json

    aws_lambda = Aws::Lambda::Client.new
    aws_s3 = Aws::S3::Resource.new

    aws_lambda.invoke(
      function_name: lambda_fn_name,
      payload: payload
    )

    bucket = aws_s3.bucket(bucket_name)
    map.failed! unless bucket.object(map.filename).exists?

    map.available!
  end
end

#MapWorker.new.perform(Map.last.id)
