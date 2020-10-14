# Lambda Copy New S3 Objects

This Lambda is to be triggered on a S3 `ObjectCreated:Put` event.

### Configuration

##### Defining Environment variables
This function uses 2 environment variables:
* `PREFIX_PATH` (Optional) Specify a specific folder to copy the objects to
* `DEST_BUCKET` (Required) The destination bucket