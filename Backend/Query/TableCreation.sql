-- LOG_IN TABLE START

CREATE TABLE LOG_IN(
    EMAIL VARCHAR2(100),
    PASSWORD VARCHAR2(100),
    TYPE VARCHAR2(10)
);

INSERT INTO LOG_IN (
    EMAIL,
    PASSWORD,
    TYPE
) VALUES (
    'c',
    '123',
    'child'
);

INSERT INTO LOG_IN (
    EMAIL,
    PASSWORD,
    TYPE
) VALUES (
    'p',
    '123',
    'parent'
);

INSERT INTO LOG_IN (
    EMAIL,
    PASSWORD,
    TYPE
) VALUES (
    'd',
    '123',
    'doctor'
);

INSERT INTO LOG_IN (
    EMAIL,
    PASSWORD,
    TYPE
) VALUES (
    't',
    '123',
    'teacher'
);

COMMIT;

-- LOG_IN TABLE END

-- CHILD TABLE START
CREATE TABLE CHILD(
    C_ID VARCHAR2(100) PRIMARY KEY,
    NAME VARCHAR2(100),
    DOB DATE,
    AGE NUMBER,
    CONTACT_NO NUMBER,
    EMAIL VARCHAR2(100),
    P_EMAIL VARCHAR2(100),
    CITY VARCHAR2(100),
    STREET VARCHAR2(100),
    POSTAL_CODE VARCHAR2(100)
);

INSERT INTO CHILD (
    C_ID,
    NAME,
    DOB,
    CONTACT_NO,
    EMAIL,
    P_EMAIL,
    CITY,
    STREET,
    POSTAL_CODE
) VALUES (
    'C01',
    'Yusuf Reza Hasnat',
    TO_DATE('1990-06-15', 'YYYY-MM-DD'),
    01790879452,
    'c01@test.com',
    'p01@test.com',
    'Dhaka',
    'Savar',
    '1312'
);

INSERT INTO CHILD (
    C_ID,
    NAME,
    DOB,
    CONTACT_NO,
    EMAIL,
    P_EMAIL,
    CITY,
    STREET,
    POSTAL_CODE
) VALUES (
    'C02',
    'Tanvin Sarkar Pallob',
    TO_DATE('2002-06-15', 'YYYY-MM-DD'),
    01233445566,
    'c02@test.com',
    'p02@test.com',
    'Dhaka',
    'Savar',
    '1312'
);

COMMIT;

UPDATE CHILD
SET
    AGE = FLOOR(
        MONTHS_BETWEEN(SYSDATE, DOB) / 12
    )
WHERE
    DOB IS NOT NULL;

COMMIT;

CREATE OR REPLACE TRIGGER TRG_UPDATE_AGE BEFORE
    INSERT OR UPDATE ON CHILD FOR EACH ROW
BEGIN
    :NEW.AGE := FLOOR(MONTHS_BETWEEN(SYSDATE, :NEW.DOB) / 12);
END;
 -- CHILD TABLE END
 -- PARENT TABLE START
CREATE TABLE PARENT( P_ID VARCHAR2(100) PRIMARY KEY, NAME VARCHAR2(100), DOB DATE, AGE NUMBER, CONTACT_NO NUMBER, EMAIL VARCHAR2(100), CITY VARCHAR2(100), STREET VARCHAR2(100), POSTAL_CODE VARCHAR2(100) );
UPDATE PARENT
SET
    AGE = FLOOR(
        MONTHS_BETWEEN(SYSDATE, DOB) / 12
    )
WHERE
    DOB IS NOT NULL;
CREATE OR REPLACE TRIGGER P_TRG_UPDATE_AGE BEFORE INSERT OR UPDATE ON PARENT FOR EACH ROW BEGIN :NEW.AGE := FLOOR(
    MONTHS_BETWEEN(SYSDATE, :NEW.DOB) / 12
);
END;
COMMIT;
 -- PARENT TABLE END
 -- HEALTH_PROFESSIONAL START
CREATE TABLE HEALTH_PROFESSIONAL( H_ID VARCHAR2(100) PRIMARY KEY, NAME VARCHAR2(100), CONTACT_NO NUMBER, EMAIL VARCHAR2(100), DEGREE VARCHAR2(100), FIELD_OF_SPEC VARCHAR2(100), CITY VARCHAR2(100), STREET VARCHAR2(100), POSTAL_CODE VARCHAR2(100) );
COMMIT;
 -- HEALTH_PROFESSIONAL END
 -- TEACHER START
CREATE TABLE TEACHER( T_ID VARCHAR2(100) PRIMARY KEY, NAME VARCHAR2(100), CONTACT_NO NUMBER, EMAIL VARCHAR2(100), INSTITUTION VARCHAR2(100) );
COMMIT;

CREATE TABLE PRODUCT (
    ID VARCHAR2(10),
    TITLE VARCHAR2(100) NOT NULL,
    SRC VARCHAR2(255),
    DESCRIPTION VARCHAR2(255),
    CONTENT VARCHAR2(255),
    PRICE NUMBER(10, 2),
    COUNT NUMBER(10)
);
INSERT INTO PRODUCT (ID, TITLE, SRC, DESCRIPTION, CONTENT, PRICE, COUNT)
VALUES ('1', 'Product 1', 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 'Quick example text to build on the card title.', 'Detailed content for Product 1.', 23.00, 10);
