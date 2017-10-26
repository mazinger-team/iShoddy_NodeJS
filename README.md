# iShoddy
Start Mongo: npm run-script startDB
Start iShoddy Node: npm start

**PROFESSIONAL**
* **Query:** GET http://ec2-54-202-209-58.us-west-2.compute.amazonaws.com/api/v1/professionals
  * Parameters
    * Query 
        * id - Professional id
        * name - Professional name
        ...
    
  * Output - JSON format
    
    ```json
    {
        "headerData": {
            "paginationData": {
                "paginationFlag": true, //More pages
                "paginationKey": 2, //Number of actual page
                "paginationElements": 10 // number of elements returned
            }
        },
        "listProfessionalsOutputType": {
            "professional": [
                {
                    "id": 8384,
                    "user_id": 34,
                    "user_name": "Pascual Pérez",
                    "demands_id": [
                    "12",
                    "9823"
                    ],
                    "category_id": 86,
                    "subcategory_id": 12,
                    "corp_name": "Electricidad Pascual S.L.",
                    "logo_url": "https://cjaronu.files.wordpress.com/2013/08/t10831.jpg",
                    "images_url": [
                    "image1_url",
                    "image2_url"
                    ],
                    "description": "Pa que vayas y lo casques",
                    "fiscal_id": "B93849593",
                    "street": "Alcapone, 3",
                    "postal_code": 28001,
                    "area": "Centro",
                    "city": "Madrid",
                    "province": "Com. Madrid",
                    "gps_lat": "40.4180563",
                    "gps_lon": "-3.7010172999999895",
                    "web_url": "http://www.chiquitoipsum.com",
                    "email": "paca@chiquitoipsum.com",
                    "telephone": "914489022",
                    "opening_hours": "De 9 a 18h",
                    "register_date": "20170802",
                    "rate_visit": 40,
                    "rate_hour": 35,
                    "rate_notes": "tarifas 2017",
                    "rating_accumulated": 9880,
                    "rating_votes": 2479,
                    "rating": 3.98,
                    "reviews_number": 6,
                    "photo_number": 15,
                    "distance": 100
                },
                {
                    "..." : "..."
                }
            ]
        }
    }
    ```
    
* **Add:** GET http://ec2-54-202-209-58.us-west-2.compute.amazonaws.com/api/v1/professionals
  * Parameters
    * Body
        * Professional fields 

  * Output - JSN format
 
    ```json
    {
        "headerData": {
            "paginationData": {
                "paginationFlag": true, //More pages
                "paginationKey": 2, //Number of actual page
                "paginationElements": 10 // number of elements returned
            }
        },
        "listProfessionalsOutputType": {
            "professional": [
                {
                    "id": 8384,
                    "user_id": 34,
                    "user_name": "Pascual Pérez",
                    "demands_id": [
                    "12",
                    "9823"
                    ],
                    "category_id": 86,
                    "subcategory_id": 12,
                    "corp_name": "Electricidad Pascual S.L.",
                    "logo_url": "https://cjaronu.files.wordpress.com/2013/08/t10831.jpg",
                    "images_url": [
                    "image1_url",
                    "image2_url"
                    ],
                    "description": "Pa que vayas y lo casques",
                    "fiscal_id": "B93849593",
                    "street": "Alcapone, 3",
                    "postal_code": 28001,
                    "area": "Centro",
                    "city": "Madrid",
                    "province": "Com. Madrid",
                    "gps_lat": "40.4180563",
                    "gps_lon": "-3.7010172999999895",
                    "web_url": "http://www.chiquitoipsum.com",
                    "email": "paca@chiquitoipsum.com",
                    "telephone": "914489022",
                    "opening_hours": "De 9 a 18h",
                    "register_date": "20170802",
                    "rate_visit": 40,
                    "rate_hour": 35,
                    "rate_notes": "tarifas 2017",
                    "rating_accumulated": 9880,
                    "rating_votes": 2479,
                    "rating": 3.98,
                    "reviews_number": 6,
                    "photo_number": 15,
                    "distance": 100
                }
            ]
        }
    }
    ```

* **Edit:** PUT http://ec2-54-202-209-58.us-west-2.compute.amazonaws.com/api/v1/professionals
  * Parameters
    * Query 
        * id: Professional id
    * Body
        * Professional fields 
  ...

  * Outpur - JSON format

    ```json
    {
        "headerData": {
            "paginationData": {
                "paginationFlag": true, //More pages
                "paginationKey": 2, //Number of actual page
                "paginationElements": 10 // number of elements returned
            }
        },
        "listProfessionalsOutputType": {
            "professional": [
                {
                    "id": 8384,
                    "user_id": 34,
                    "user_name": "Pascual Pérez",
                    "demands_id": [
                    "12",
                    "9823"
                    ],
                    "category_id": 86,
                    "subcategory_id": 12,
                    "corp_name": "Electricidad Pascual S.L.",
                    "logo_url": "https://cjaronu.files.wordpress.com/2013/08/t10831.jpg",
                    "images_url": [
                    "image1_url",
                    "image2_url"
                    ],
                    "description": "Pa que vayas y lo casques",
                    "fiscal_id": "B93849593",
                    "street": "Alcapone, 3",
                    "postal_code": 28001,
                    "area": "Centro",
                    "city": "Madrid",
                    "province": "Com. Madrid",
                    "gps_lat": "40.4180563",
                    "gps_lon": "-3.7010172999999895",
                    "web_url": "http://www.chiquitoipsum.com",
                    "email": "paca@chiquitoipsum.com",
                    "telephone": "914489022",
                    "opening_hours": "De 9 a 18h",
                    "register_date": "20170802",
                    "rate_visit": 40,
                    "rate_hour": 35,
                    "rate_notes": "tarifas 2017",
                    "rating_accumulated": 9880,
                    "rating_votes": 2479,
                    "rating": 3.98,
                    "reviews_number": 6,
                    "photo_number": 15,
                    "distance": 100
                }
            ]
        }
    }
    ```
    
* **Delete:** DELETE http://ec2-54-202-209-58.us-west-2.compute.amazonaws.com/api/v1/professionals
  * Parameters
    * Query 
        * id: Professional id
