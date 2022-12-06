
-- DATABASE NAME : womens_health_app

CREATE TABLE "age_range" ( -- FOR QUESTIONS SEARCH AND CARE GUIDELINES
    "id" SERIAL PRIMARY KEY,
    "age" VARCHAR
); -- THIS TABLE IS STATIC. DOES NOT CHANGE PROGRAMICALLY

CREATE TABLE "health_category" ( -- FOR QUESTIONS SEARCH
    "id" SERIAL PRIMARY KEY,
    "category" VARCHAR
); -- THIS TABLE IS STATIC. DOES NOT CHANGE PROGRAMICALLY

CREATE TABLE "playbook" ( -- QUESTIONS TO ASK THE DOCTOR
    "id" SERIAL PRIMARY KEY,
    "question" VARCHAR,
    "age_range_id" INT REFERENCES "age_range",
    "category_id" INT REFERENCES "health_category"
); -- INSERT INTO "playbook" ("question", "age_range_id", "category_id") VALUES ("Q?", ##, ##);
-- ADMIN can add, remove, edit

CREATE TABLE "care_guideline" ( -- CARE TIMELINE TO FOLLOW
    "id" SERIAL PRIMARY KEY,
    "info" VARCHAR,
    "age_id" INT REFERENCES "age_range"
); -- INSERT INTO "care_guideline" ("info", "age_id") VALUES ("I?", ##);
-- ADMIN can add, remove, edit

CREATE TABLE "user" ( -- USER INFORMATION
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR,
    "password" VARCHAR,
    "email" VARCHAR,
    "age_range_id" INT REFERENCES "age_range",
    "zip_code" INT
); -- USER is created upon registration. EMAIL, AGE_RANGE_ID, ZIP_CODE should be editable.

CREATE TABLE "resource" ( -- DOCUMENTS TO UPLOAD / DOWNLOAD
    "id" SERIAL PRIMARY KEY,
    "document" VARCHAR,
); -- ADMIN can add, remove

CREATE TABLE "physician" ( -- PHYSICIANS TO BE DISPLAYED
    "id" SERIAL PRIMARY KEY,
    "name" VARCHAR,
    "email" VARCHAR
); -- ADMIN can add, remove, edit

CREATE TABLE "feedback" (
    "id" SERIAL PRIMARY KEY,
    "rating" INT,
    "comment" VARCHAR,
    "user_id" INT REFERENCES "user"
); -- USER adds rows when submitting a feedback form. user_id = req.user.id;
-- ADMIN can remove (?)

INSERT INTO "age_range" ("age") VALUES ("21-25"), ("26-30"), ("31-35"), ("36-40"), ("41-45"), ("46-50"), ("51-55"), ("56-60");
/*
   AGE    RANGE
    1     21 - 25
    2     26 - 30
    3     31 - 35
    4     36 - 40
    5     41 - 45
    6     46 - 50
    7     51 - 55
    8     56 - 60
*/

INSERT INTO "health_category" ("category") VALUES ("gynecology"), ("cancers"), ("hormone therapy"), ("diseases")
/*
    ID      CATEGORY
    1       gynecology
    2       cancers
    3       hormone therapy
    4       osteoporosis
    5       heart disease
    ... and so on
*/

