-- RUN THESE QUERIES TO CREATE DATABASE (POSTICO RECOMMENDED)

-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL
);

CREATE TABLE "grades" (
  "id" SERIAL PRIMARY KEY,
  "grade" VARCHAR(10),
  "type" VARCHAR(15)
);

INSERT INTO "grades" ("grade", "type")
VALUES
('5.6', 'ysd'),
('5.7', 'ysd'),
('5.8', 'ysd'),
('5.9', 'ysd'),
('5.10a', 'ysd'),
('5.10b', 'ysd'),
('5.10c', 'ysd'),
('5.10d', 'ysd'),
('5.11a', 'ysd'),
('5.11b', 'ysd'),
('5.11c', 'ysd'),
('5.11d', 'ysd'),
('5.12a', 'ysd'),
('5.12b', 'ysd'),
('5.12c', 'ysd'),
('5.12d', 'ysd'),
('5.13a', 'ysd'),
('5.13b', 'ysd'),
('5.13c', 'ysd'),
('5.13d', 'ysd'),
('5.14a', 'ysd'),
('5.14b', 'ysd'),
('5.14c', 'ysd'),
('5.14d', 'ysd'),
('5.6', 'ysd_simple'),
('5.7', 'ysd_simple'),
('5.8', 'ysd_simple'),
('5.9', 'ysd_simple'),
('5.10-', 'ysd_simple'),
('5.10+', 'ysd_simple'),
('5.11-', 'ysd_simple'),
('5.11+', 'ysd_simple'),
('5.12-', 'ysd_simple'),
('5.12+', 'ysd_simple'),
('5.13-', 'ysd_simple'),
('5.13+', 'ysd_simple'),
('5.14-', 'ysd_simple'),
('5.14+', 'ysd_simple'),
('5a', 'french'),
('5b', 'french'),
('5c', 'french'),
('6a', 'french'),
('6a+', 'french'),
('6b', 'french'),
('6b+', 'french'),
('6c', 'french'),
('6c+', 'french'),
('7a', 'french'),
('7a+', 'french'),
('7b', 'french'),
('7b+', 'french'),
('7c', 'french'),
('7c+', 'french'),
('8a', 'french'),
('8a+', 'french'),
('8b', 'french'),
('8b+', 'french'),
('8c', 'french'),
('8c+', 'french')
;

CREATE TABLE "rope" (
  "id" SERIAL PRIMARY KEY,
  "type" VARCHAR(100)
);

INSERT INTO "rope" ("type")
VALUES
('top rope'),
('lead'),
('autobelay')
;

CREATE TABLE "wall" (
  "id" SERIAL PRIMARY KEY,
  "angle" VARCHAR(100)
);

INSERT INTO "wall" ("angle")
VALUES
('slab'),
('vertical'),
('overhang')
;

CREATE TABLE "holds" (
  "id" SERIAL PRIMARY KEY,
  "type" VARCHAR(50)
);

INSERT INTO "holds" ("type")
VALUES
('crimps'),
('slopers'),
('jugs'),
('pinches')
;

CREATE TABLE "routes" (
  "id" SERIAL PRIMARY KEY,
  "notes" VARCHAR(255),
  "image" VARCHAR(255),
  "flash" BOOLEAN NOT NULL,
  "sent" BOOLEAN NOT NULL,
  "date" DATE NOT NULL,
  "user_id" INT NOT NULL REFERENCES "user"(id),
  "grades_id" INT NOT NULL REFERENCES "grades"(id),
  "rope_type_id" INT NOT NULL REFERENCES "rope"(id),
  "holds_id" INT REFERENCES "holds"(id),
  "wall_id" INT REFERENCES "wall"(id)
);
