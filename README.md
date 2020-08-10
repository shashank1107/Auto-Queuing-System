# Auto Queuing System for on-demand service providers


Database Logic: There are three tables that are created-
dashboard( request_id, driver_id, request_status, start_time)
-  It maintains status of each request.

driver( driver_id, driver_flag )
-  It maintains the status of driver. If driver_flag is 1, then he is not available to take the ride. If 0, then he is available.

 request( request_id, customer_id, request_time)
	- It maintains which customer has requested for a ride and at what time.


Backend Logic: Divided backend logic into three different routes.
Driver - 
POST /api/driver/select/:requestid
Body parameters : driverid  
Use case : Select ride. First it checks whether driver is allowed to take request. Then, it checks if requests is available to take. If it is, then it gets updated into driver table and dashboard table.

POST /api/driver/list
Body parameters : driverid  
Use case : Get all rides of that driver. 

Dashboard -
POST /api/
		No parameters
		Use case : Gets all requests with their status. On refresh click, all ongoing      requests that are completed are updated in dashboard DB.

customer - POST /api/customer/
Body parameters : customerid.  
Use case : Allows customer to select ride and inserted in request table.
