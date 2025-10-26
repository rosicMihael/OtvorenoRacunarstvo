-- Table: public.vodstvo

-- DROP TABLE IF EXISTS public.vodstvo;

CREATE TABLE IF NOT EXISTS public.vodstvo
(
    vodstvo_id integer NOT NULL DEFAULT nextval('vodstvo_vodstvo_id_seq'::regclass),
    dvd_id integer NOT NULL,
    uloga text COLLATE pg_catalog."default" NOT NULL,
    ime text COLLATE pg_catalog."default" NOT NULL,
    prezime text COLLATE pg_catalog."default" NOT NULL,
    kontakt text COLLATE pg_catalog."default",
    CONSTRAINT vodstvo_pkey PRIMARY KEY (vodstvo_id),
    CONSTRAINT vodstvo_dvd_id_fkey FOREIGN KEY (dvd_id)
        REFERENCES public.dvd (dvd_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE CASCADE
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.vodstvo
    OWNER to postgres;