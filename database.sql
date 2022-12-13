CREATE TABLE "user" (
	"id" serial NOT NULL,
	"username" varchar(255) NOT NULL UNIQUE,
	"password" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL UNIQUE,
	"age" int NOT NULL,
	"zip_code" int NOT NULL,
	"access_level" int NOT NULL,
	CONSTRAINT "user_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "health_category" (
	"id" serial NOT NULL,
	"category" varchar(255) NOT NULL,
	CONSTRAINT "health_category_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "medical_links" (
	"id" serial NOT NULL,
	"name" varchar(255) NOT NULL,
	"link" varchar(255) NOT NULL,
	"logo_url" varchar(1024),
	CONSTRAINT "medical_links_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "virtuahealth" (
	"id" serial NOT NULL,
	"name" varchar(255) NOT NULL,
	"info_cost" varchar(1024),
	"link" varchar(255) NOT NULL,
	"specialty" varchar(255),
	"logo_url" varchar(1000),
	CONSTRAINT "virtuahealth_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "feedback" (
	"id" serial NOT NULL,
	"rating" int NOT NULL,
	"comment" varchar(255) NOT NULL,
	"user_id" int NOT NULL UNIQUE,
	CONSTRAINT "feedback_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "faq" (
	"id" serial NOT NULL,
	"question" varchar(1024) NOT NULL,
	"answer" varchar(1024) NOT NULL,
	"health_category_id" int NOT NULL,
	"age_range_id" int NOT NULL,
	CONSTRAINT "faq_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "feedback_q" (
	"id" serial NOT NULL,
	"question" varchar(255) NOT NULL,
	"answer" varchar(255) NOT NULL,
	"feedback_id" int NOT NULL,
	CONSTRAINT "feedback_q_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "diagnostic_tool" (
	"id" serial NOT NULL,
	"name" varchar(255) NOT NULL,
	"info" varchar(1024) NOT NULL,
	"health_category_id" int NOT NULL,
	"age_range_id" int NOT NULL,
	CONSTRAINT "diagnostic_tool_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "newsletter" (
	"id" serial NOT NULL,
	"email" varchar(255) NOT NULL UNIQUE,
	CONSTRAINT "newsletter_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "age_range" (
	"id" serial NOT NULL,
	"low" int NOT NULL,
	"high" int NOT NULL,
	CONSTRAINT "age_range_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "doctor_questions" (
	"id" serial NOT NULL,
	"question" varchar(1024) NOT NULL,
	"answer" varchar(1024) NOT NULL,
	"health_category_id" int NOT NULL,
	"age_range_id" int NOT NULL,
	CONSTRAINT "doctor_questions_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "resources" (
	"id" serial NOT NULL,
	"name" varchar(255) NOT NULL,
	"link" varchar(1024) NOT NULL,
	"description" varchar(1024) NOT NULL,
	"health_category_id" int NOT NULL,
	CONSTRAINT "resources_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "guidelines" (
	"id" serial NOT NULL,
	"name" varchar(255) NOT NULL,
	"info" varchar(1024) NOT NULL,
	"health_category_id" int NOT NULL,
	"age_range_id" int NOT NULL,
	"grade" varchar(255),
	"date" DATE,
	CONSTRAINT "guidelines_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);







ALTER TABLE "feedback" ADD CONSTRAINT "feedback_fk0" FOREIGN KEY ("user_id") REFERENCES "user"("id");

ALTER TABLE "faq" ADD CONSTRAINT "faq_fk0" FOREIGN KEY ("health_category_id") REFERENCES "health_category"("id");
ALTER TABLE "faq" ADD CONSTRAINT "faq_fk1" FOREIGN KEY ("age_range_id") REFERENCES "age_range"("id");

ALTER TABLE "feedback_q" ADD CONSTRAINT "feedback_q_fk0" FOREIGN KEY ("feedback_id") REFERENCES "feedback"("id");

ALTER TABLE "diagnostic_tool" ADD CONSTRAINT "diagnostic_tool_fk0" FOREIGN KEY ("health_category_id") REFERENCES "health_category"("id");
ALTER TABLE "diagnostic_tool" ADD CONSTRAINT "diagnostic_tool_fk1" FOREIGN KEY ("age_range_id") REFERENCES "age_range"("id");



ALTER TABLE "doctor_questions" ADD CONSTRAINT "doctor_questions_fk0" FOREIGN KEY ("health_category_id") REFERENCES "health_category"("id");
ALTER TABLE "doctor_questions" ADD CONSTRAINT "doctor_questions_fk1" FOREIGN KEY ("age_range_id") REFERENCES "age_range"("id");

ALTER TABLE "resources" ADD CONSTRAINT "resources_fk0" FOREIGN KEY ("health_category_id") REFERENCES "health_category"("id");

ALTER TABLE "guidelines" ADD CONSTRAINT "guidelines_fk0" FOREIGN KEY ("health_category_id") REFERENCES "health_category"("id");
ALTER TABLE "guidelines" ADD CONSTRAINT "guidelines_fk1" FOREIGN KEY ("age_range_id") REFERENCES "age_range"("id");



INSERT INTO "age_range" ("low", "high")
VALUES (15, 19), (20, 24), (25, 29), (30, 34), (35, 39), (40, 44), (45, 49), (50, 54), (55, 59), (60, 64), (65, 69), (70, 74), (75, 79)
;