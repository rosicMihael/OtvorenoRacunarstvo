-- Table: public.dvd

-- DROP TABLE IF EXISTS public.dvd;

CREATE TABLE IF NOT EXISTS public.dvd
(
    dvd_id integer NOT NULL DEFAULT nextval('dvd_dvd_id_seq'::regclass),
    naziv text COLLATE pg_catalog."default" NOT NULL,
    oib character(11) COLLATE pg_catalog."default" NOT NULL,
    adresa_id integer NOT NULL,
    gradska_cetvrt_id integer NOT NULL,
    email text COLLATE pg_catalog."default" NOT NULL,
    telefon text COLLATE pg_catalog."default" NOT NULL,
    web_stranica text COLLATE pg_catalog."default",
    godina_osnutka integer NOT NULL,
    broj_clanova integer,
    CONSTRAINT dvd_pkey PRIMARY KEY (dvd_id),
    CONSTRAINT dvd_oib_key UNIQUE (oib),
    CONSTRAINT dvd_adresa_id_fkey FOREIGN KEY (adresa_id)
        REFERENCES public.adresa (adresa_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT dvd_gradska_cetvrt_id_fkey FOREIGN KEY (gradska_cetvrt_id)
        REFERENCES public.gradska_cetvrt (gradska_cetvrt_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.dvd
    OWNER to postgres;