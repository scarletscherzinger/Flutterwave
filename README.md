# Lannisterpay (TPSS)
A NodeJS API service that implements a transaction payment splitting service (TPSS)

---
### check node is installed
- node -v
```
  node version v14.18.1 or gte

```
### How to Run the service

1. **Install all required packages.**

   ```
    npm install
   ```

2. **Start API.**

   ```
    npm run service
   ```
3. **API running on localhost port 8000**
   - endpoints: post: split-payments/compute/
   - from postman local: 127.0.0.1:8000/split-payments/compute/

   - #### Example payload:
   ```
     {
         "ID": 13092,
         "Amount": 4500,
         "Currency": "NGN",
         "CustomerEmail": "anon8@customers.io",
         "SplitInfo": [
            {
                  "SplitType": "FLAT",
                  "SplitValue": 450,
                  "SplitEntityId": "LNPYACC0019"
            },
            {
                  "SplitType": "RATIO",
                  "SplitValue": 3,
                  "SplitEntityId": "LNPYACC0011"
            },
            {
                  "SplitType": "PERCENTAGE",
                  "SplitValue": 3,
                  "SplitEntityId": "LNPYACC0015"
            },
            {
                  "SplitType": "RATIO",
                  "SplitValue": 2,
                  "SplitEntityId": "LNPYACC0016"
            },
            {
                  "SplitType": "FLAT",
                  "SplitValue": 2450,
                  "SplitEntityId": "LNPYACC0029"
            },
            {
                  "SplitType": "PERCENTAGE",
                  "SplitValue": 10,
                  "SplitEntityId": "LNPYACC0215"
            }
         ]
      }


   ```
   - #### Example response
   ```
      {
         "ID": 13092,
         "Balance": 0,
         "SplitBreakdown": [
            {
                  "SplitEntityId": "LNPYACC0019",
                  "Amount": 450
            },
            {
                  "SplitEntityId": "LNPYACC0011",
                  "Amount": 838.0799999999999
            },
            {
                  "SplitEntityId": "LNPYACC0015",
                  "Amount": 48
            },
            {
                  "SplitEntityId": "LNPYACC0016",
                  "Amount": 558.72
            },
            {
                  "SplitEntityId": "LNPYACC0029",
                  "Amount": 2450
            },
            {
                  "SplitEntityId": "LNPYACC0215",
                  "Amount": 155.20000000000002
            }
         ]
      }
   ```


