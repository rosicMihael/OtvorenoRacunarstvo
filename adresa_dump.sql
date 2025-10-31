-- Table: public.adresa

-- DROP TABLE IF EXISTS public.adresa;

CREATE TABLE IF NOT EXISTS public.adresa
(
    adresa_id integer NOT NULL DEFAULT nextval('adresa_adresa_id_seq'::regclass),
    ulica text COLLATE pg_catalog."default" NOT NULL,
    postanski_broj character(5) COLLATE pg_catalog."default" NOT NULL,
    grad text COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT adresa_pkey PRIMARY KEY (adresa_id)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.adresa
    OWNER to postgres;