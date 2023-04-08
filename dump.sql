--
-- PostgreSQL database dump
--

-- Dumped from database version 12.14 (Ubuntu 12.14-0ubuntu0.20.04.1)
-- Dumped by pg_dump version 12.14 (Ubuntu 12.14-0ubuntu0.20.04.1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: btree_gist; Type: EXTENSION; Schema: -; Owner: -
--
--
-- Name: EXTENSION btree_gist; Type: COMMENT; Schema: -; Owner: -
--


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: appointments; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.appointments (
    id integer NOT NULL,
    appointmentday date NOT NULL,
    appointmenthour time without time zone NOT NULL,
    patient_id integer,
    doctor_id integer,
    confirmed boolean DEFAULT false NOT NULL,
    canceled boolean DEFAULT false NOT NULL
);


--
-- Name: appointments_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.appointments_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: appointments_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.appointments_id_seq OWNED BY public.appointments.id;


--
-- Name: doctors; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.doctors (
    id integer NOT NULL,
    name character varying(110) NOT NULL,
    email character varying(110) NOT NULL,
    password character varying(255) NOT NULL,
    specialty character varying(255) NOT NULL,
    state character varying(100) NOT NULL,
    city character varying(100) NOT NULL,
    address character varying(255) NOT NULL
);


--
-- Name: doctors_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.doctors_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: doctors_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.doctors_id_seq OWNED BY public.doctors.id;


--
-- Name: patients; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.patients (
    id integer NOT NULL,
    name character varying(100) NOT NULL,
    email character varying(150) NOT NULL,
    password character varying(150) NOT NULL
);


--
-- Name: patients_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.patients_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: patients_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.patients_id_seq OWNED BY public.patients.id;


--
-- Name: appointments id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.appointments ALTER COLUMN id SET DEFAULT nextval('public.appointments_id_seq'::regclass);


--
-- Name: doctors id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.doctors ALTER COLUMN id SET DEFAULT nextval('public.doctors_id_seq'::regclass);


--
-- Name: patients id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.patients ALTER COLUMN id SET DEFAULT nextval('public.patients_id_seq'::regclass);


--
-- Data for Name: appointments; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.appointments VALUES (1, '2023-08-16', '16:00:00', 1, 1, false, false);
INSERT INTO public.appointments VALUES (2, '2023-04-08', '16:00:00', 1, 1, false, false);
INSERT INTO public.appointments VALUES (3, '2023-04-09', '16:00:00', 1, 1, false, false);
INSERT INTO public.appointments VALUES (4, '2023-04-09', '20:00:00', 1, 1, false, false);
INSERT INTO public.appointments VALUES (5, '2023-04-09', '22:00:00', 1, 1, false, false);
INSERT INTO public.appointments VALUES (6, '2023-04-08', '22:00:00', 1, 1, false, false);
INSERT INTO public.appointments VALUES (7, '2023-04-08', '18:00:00', 1, 1, false, false);
INSERT INTO public.appointments VALUES (8, '2023-04-08', '14:00:00', 1, 1, false, false);
INSERT INTO public.appointments VALUES (9, '2022-04-08', '14:00:00', 1, 1, false, false);
INSERT INTO public.appointments VALUES (10, '2023-04-17', '14:30:00', 1, 2, false, false);
INSERT INTO public.appointments VALUES (11, '2023-04-14', '12:30:00', 1, 2, false, false);
INSERT INTO public.appointments VALUES (12, '2023-04-19', '14:30:00', 1, 2, false, false);
INSERT INTO public.appointments VALUES (15, '2023-05-22', '14:30:00', 1, 3, true, false);
INSERT INTO public.appointments VALUES (14, '2023-05-18', '14:30:00', 1, 3, true, false);
INSERT INTO public.appointments VALUES (17, '2023-05-18', '15:30:00', 1, 3, false, false);
INSERT INTO public.appointments VALUES (16, '2023-04-20', '14:30:00', 1, 3, true, true);
INSERT INTO public.appointments VALUES (13, '2023-04-18', '14:30:00', 1, 3, true, true);
INSERT INTO public.appointments VALUES (19, '2025-04-22', '14:30:00', 1, 3, false, false);
INSERT INTO public.appointments VALUES (18, '2023-05-18', '17:30:00', 1, 3, true, true);


--
-- Data for Name: doctors; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.doctors VALUES (1, 'Dr.Arthur', 'arthur@arthur.com', '$2b$10$m78.viegS..9JIkDAOVUpuLRSD7JBLlI8YCh9jj.Xz3qyluTyM9HG', 'cura do cancer', 'chernobiu', 'chernogog', 'dasadsadsdasdas');
INSERT INTO public.doctors VALUES (2, 'Dr.Boris', 'Boris@boris.com', '$2b$10$feQ/E94N5/qyxWY5hd0t3ufqI9619gDuqVqOhsqYqxIrXHSpyNriG', 'cura do cancer', 'chernobiu', 'chernogog', 'dasadsadsdasdas');
INSERT INTO public.doctors VALUES (3, 'Dr.Vegapunk', 'vegapunk@vegapunk.com', '$2b$10$3Y9NQXAC/T6qdUET6xvIK.lQtb5yX00c6//SEsenoTuylGc5gsNP2', 'devil fruits', 'New World', 'somewhere around the globe', 'youWillNeverKnow');
INSERT INTO public.doctors VALUES (4, 'Dr.Byron', 'byron@byron.com', '$2b$10$mfm3d1HDJo0uGMvDIBKIjOTnFCHsAvkPpXOru8jx.Eq3QuHdsspdq', 'devil fruits', 'New World', 'somewhere around the globe', 'youWillNeverKnow');


--
-- Data for Name: patients; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.patients VALUES (1, 'Arthur', 'arthur@arthur.com', '$2b$10$xh2TSWhitLPUya7rS6RqTOcpOmi2mWTLoxBrMqaMrZmmmzkmSmZE2');
INSERT INTO public.patients VALUES (2, 'xablau', 'xablau@xablau.com', '$2b$10$s234qqI2I5hBfSWgkxkCZeg2Q/gdGXG4fJT0OR9xGaj6478cy1vq6');


--
-- Name: appointments_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.appointments_id_seq', 19, true);


--
-- Name: doctors_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.doctors_id_seq', 4, true);


--
-- Name: patients_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.patients_id_seq', 2, true);


--
-- Name: appointments appointments_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.appointments
    ADD CONSTRAINT appointments_pkey PRIMARY KEY (id);


--
-- Name: doctors doctors_email_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.doctors
    ADD CONSTRAINT doctors_email_key UNIQUE (email);


--
-- Name: doctors doctors_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.doctors
    ADD CONSTRAINT doctors_pkey PRIMARY KEY (id);


--
-- Name: patients patients_email_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.patients
    ADD CONSTRAINT patients_email_key UNIQUE (email);


--
-- Name: patients patients_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.patients
    ADD CONSTRAINT patients_pkey PRIMARY KEY (id);


--
-- Name: appointments appointments_doctor_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.appointments
    ADD CONSTRAINT appointments_doctor_id_fkey FOREIGN KEY (doctor_id) REFERENCES public.doctors(id);


--
-- Name: appointments appointments_patient_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.appointments
    ADD CONSTRAINT appointments_patient_id_fkey FOREIGN KEY (patient_id) REFERENCES public.patients(id);


--
-- PostgreSQL database dump complete
--

