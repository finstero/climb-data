
CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL
);

CREATE TABLE "ysd" (
  "id" SERIAL PRIMARY KEY,
  "grade" VARCHAR(10)
);

INSERT INTO "ysd" ("grade")
VALUES
('5.6'),
('5.7'),
('5.8'),
('5.9'),
('5.10a'),
('5.10b'),
('5.10c'),
('5.10d'),
('5.11a'),
('5.11b'),
('5.11c'),
('5.11d'),
('5.12a'),
('5.12b'),
('5.12c'),
('5.12d'),
('5.13a'),
('5.13b'),
('5.13c'),
('5.13d'),
('5.14a'),
('5.14b'),
('5.14c'),
('5.14d')
;

CREATE TABLE "ysd_simple" (
  "id" SERIAL PRIMARY KEY,
  "grade" VARCHAR(10)
);

INSERT INTO "ysd_simple" ("grade")
VALUES
('5.6'),
('5.7'),
('5.8'),
('5.9'),
('5.10-'),
('5.10+'),
('5.11-'),
('5.11+'),
('5.12-'),
('5.12+'),
('5.13-'),
('5.13+'),
('5.14-'),
('5.14+')
;

CREATE TABLE "french" (
  "id" SERIAL PRIMARY KEY,
  "grade" VARCHAR(10)
);

INSERT INTO "french" ("grade")
VALUES
('5a'),
('5b'),
('5c'),
('6a'),
('6a+'),
('6b'),
('6b+'),
('6c'),
('6c+'),
('7a'),
('7a+'),
('7b'),
('7b+'),
('7c'),
('7c+'),
('8a'),
('8a+'),
('8b'),
('8b+'),
('8c'),
('8c+')
;

CREATE TABLE "routes" (
  "id" SERIAL PRIMARY KEY,
  "notes" VARCHAR(255),
  "image" VARCHAR(255),
  "flash" BOOLEAN NOT NULL,
  "sent" BOOLEAN NOT NULL,
  "date" DATE NOT NULL,
  "user_id" INT NOT NULL,
  "ysd_id" INT,
  "ysd_simple_id" INT,
  "french_id" INT,
  "rope_type_id" INT NOT NULL
);

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

CREATE TABLE "routes_wall" (
  "id" SERIAL PRIMARY KEY,
  "routes_id" INT NOT NULL,
  "wall_id" INT NOT NULL
);

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

CREATE TABLE "routes_holds" (
  "id" SERIAL PRIMARY KEY,
  "routes_id" INT NOT NULL,
  "holds_id" INT NOT NULL
);
