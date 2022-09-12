/**
 * 
 *  Create a order service
 * 
 *      Fucntionality :
 * 
 *     Authentication and Authorization using the JWT token
 *  
 * 
 *        1. Authenticated and authorized user should be able to place order
 *          
 *          POST   /orderService/api/v1/orders
 * 
 *        2. Authenticated and authorized user should be able to update the order
 *              ( only if the order is not cancelled or fulfilled already )
 *              (ADMIN/OWNER)
 *          
 *          PUT /orderService/api/v1/orders/{id}
 * 
 *       3. Authenticated and authorized user should be able to cancel the order
 *              ( only the owner or ADMIN should be allowed to do this )
 *         
 *          PUT /orderService/api/v1/orders/{id}
 * 
 *       4. Authenticated and authorized user should be able to get all the orders
 *              (owner should get only his order, ADMIN should get all the orders)
 *         
 *          GET /orderService/api/v1/orders/
 * 
 * 
 * 
 * 
 *   Order schema :
 * 
 *       customerId 
 *       deliverydate
 *       status :  SUCCESS | IN_PROGRESS | CANCELLED
 *       items -> String
 *       totalCost
 *       address -> String
 *       createdAt|updatedAt
 * 
 * 
 */