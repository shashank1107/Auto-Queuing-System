# olaapp

Backend codebase : https://github.com/shashank1107/olaapp 
Backend server : http://52.26.22.157:3000/  

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

  

Challenges faced while completing exercise:

A lot time went into setting up aws instance. As I used my account few months back, all settings were obsolete. So had to set up another instance.

There was open port issue. I tried to configure it using nginx but it was centOS so there were some other config changes. Finally, open HTTP-TCP port for all IPs.

I have used mysql long time back. So, when i tried to run it on my new machine, there were some dependencies because of which I could run it locally. So, I pushed the code and checked it on aws server.
