-- Table: public.gradska_cetvrt

-- DROP TABLE IF EXISTS public.gradska_cetvrt;

CREATE TABLE IF NOT EXISTS public.gradska_cetvrt
(
    gradska_cetvrt_id integer NOT NULL DEFAULT nextval('gradska_cetvrt_gradska_cetvrt_id_seq'::regclass),
    naziv text COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT gradska_cetvrt_pkey PRIMARY KEY (gradska_cetvrt_id),
    CONSTRAINT gradska_cetvrt_naziv_key UNIQUE (naziv)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.gradska_cetvrt
    OWNER to postgres;