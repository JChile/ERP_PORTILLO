--
-- PostgreSQL database dump
--

-- Dumped from database version 14.9 (Ubuntu 14.9-0ubuntu0.22.04.1)
-- Dumped by pg_dump version 14.9 (Ubuntu 14.9-0ubuntu0.22.04.1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Data for Name: auth_group; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.auth_group (id, name) FROM stdin;
1	Jefe de Marketing
2	Asistente de marketing
3	Jefe de Recursos Humanos
4	Jefe de Ventas
\.


--
-- Data for Name: django_content_type; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.django_content_type (id, app_label, model) FROM stdin;
1	admin	logentry
2	auth	permission
3	auth	group
4	contenttypes	contenttype
5	sessions	session
6	cuenta	estadoregistro
7	cuenta	profile
8	cuenta	modulo
9	cuenta	user
10	marketing	proyecto
11	marketing	categoria
12	marketing	campania
13	ventas	asesor
14	ventas	estadolead
15	ventas	lead
16	ventas	whatsapp
17	ventas	objecion
18	ventas	llamada
19	token_blacklist	blacklistedtoken
20	token_blacklist	outstandingtoken
\.


--
-- Data for Name: auth_permission; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.auth_permission (id, name, content_type_id, codename) FROM stdin;
1	Can add log entry	1	add_logentry
2	Can change log entry	1	change_logentry
3	Can delete log entry	1	delete_logentry
4	Can view log entry	1	view_logentry
5	Can add permission	2	add_permission
6	Can change permission	2	change_permission
7	Can delete permission	2	delete_permission
8	Can view permission	2	view_permission
9	Can add group	3	add_group
10	Can change group	3	change_group
11	Can delete group	3	delete_group
12	Can view group	3	view_group
13	Can add content type	4	add_contenttype
14	Can change content type	4	change_contenttype
15	Can delete content type	4	delete_contenttype
16	Can view content type	4	view_contenttype
17	Can add session	5	add_session
18	Can change session	5	change_session
19	Can delete session	5	delete_session
20	Can view session	5	view_session
21	Can add estado registro	6	add_estadoregistro
22	Can change estado registro	6	change_estadoregistro
23	Can delete estado registro	6	delete_estadoregistro
24	Can view estado registro	6	view_estadoregistro
25	Can add profile	7	add_profile
26	Can change profile	7	change_profile
27	Can delete profile	7	delete_profile
28	Can view profile	7	view_profile
29	Can add modulo	8	add_modulo
30	Can change modulo	8	change_modulo
31	Can delete modulo	8	delete_modulo
32	Can view modulo	8	view_modulo
33	Can add user	9	add_user
34	Can change user	9	change_user
35	Can delete user	9	delete_user
36	Can view user	9	view_user
37	Can add proyecto	10	add_proyecto
38	Can change proyecto	10	change_proyecto
39	Can delete proyecto	10	delete_proyecto
40	Can view proyecto	10	view_proyecto
41	Can add categoria	11	add_categoria
42	Can change categoria	11	change_categoria
43	Can delete categoria	11	delete_categoria
44	Can view categoria	11	view_categoria
45	Can add campania	12	add_campania
46	Can change campania	12	change_campania
47	Can delete campania	12	delete_campania
48	Can view campania	12	view_campania
49	Can add asesor	13	add_asesor
50	Can change asesor	13	change_asesor
51	Can delete asesor	13	delete_asesor
52	Can view asesor	13	view_asesor
53	Can add estado lead	14	add_estadolead
54	Can change estado lead	14	change_estadolead
55	Can delete estado lead	14	delete_estadolead
56	Can view estado lead	14	view_estadolead
57	Can add lead	15	add_lead
58	Can change lead	15	change_lead
59	Can delete lead	15	delete_lead
60	Can view lead	15	view_lead
61	Can add whats app	16	add_whatsapp
62	Can change whats app	16	change_whatsapp
63	Can delete whats app	16	delete_whatsapp
64	Can view whats app	16	view_whatsapp
65	Can add objecion	17	add_objecion
66	Can change objecion	17	change_objecion
67	Can delete objecion	17	delete_objecion
68	Can view objecion	17	view_objecion
69	Can add llamada	18	add_llamada
70	Can change llamada	18	change_llamada
71	Can delete llamada	18	delete_llamada
72	Can view llamada	18	view_llamada
73	Can add blacklisted token	19	add_blacklistedtoken
74	Can change blacklisted token	19	change_blacklistedtoken
75	Can delete blacklisted token	19	delete_blacklistedtoken
76	Can view blacklisted token	19	view_blacklistedtoken
77	Can add outstanding token	20	add_outstandingtoken
78	Can change outstanding token	20	change_outstandingtoken
79	Can delete outstanding token	20	delete_outstandingtoken
80	Can view outstanding token	20	view_outstandingtoken
\.


--
-- Data for Name: auth_group_permissions; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.auth_group_permissions (id, group_id, permission_id) FROM stdin;
2	1	45
3	1	46
4	1	47
5	1	48
6	1	49
7	1	50
8	1	51
9	1	52
10	1	53
11	1	54
12	1	55
13	1	56
14	2	45
15	2	46
16	2	47
17	2	48
18	2	57
19	2	58
20	2	59
21	2	60
22	3	33
23	3	34
24	3	35
25	3	36
26	3	9
27	3	10
28	3	11
29	3	12
30	4	45
31	4	53
32	4	54
33	4	55
34	4	56
\.


--
-- Data for Name: cuenta_estadoregistro; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.cuenta_estadoregistro (estado, nombre) FROM stdin;
A	Activo
I	Inactivo
\.


--
-- Data for Name: cuenta_modulo; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.cuenta_modulo (id, nombre, "contentType_id", estado_id) FROM stdin;
1	Gestion de leads	15	A
2	Gestion de campañas	12	A
3	Gestion de roles	3	A
4	Gestión de asesores	13	A
5	Gestion de usuarios	9	A
\.


--
-- Data for Name: cuenta_profile; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.cuenta_profile (id, dni, fecha, nacionalidad, "estadoCivil", "correoElectronico", celular, "telefonoFijo", profesion, talla_polo, cuenta_ahorros, contacto_caso_accidentes, parentesco_contacto_caso_accidentes, grupo_sanguineo, alergias, fondo_pension, "primerTrabajo", hijos, conyuge, p_mp, fecha_inicio_contrato, fecha_fin_contrato, sueldo, horario, documentos, estado_registro_id) FROM stdin;
2	\N	\N												\N			\N			\N	\N	\N			A
1	\N	\N												\N			\N			\N	\N	\N		\N	A
\.


--
-- Data for Name: cuenta_user; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.cuenta_user (id, password, last_login, is_superuser, username, first_name, last_name, email, is_staff, is_active, date_joined, perfil_id) FROM stdin;
1	pbkdf2_sha256$600000$XeMWVNeYvgoN3QLYxfsCkW$gJyjaRFRAGC8je7My6z54vkKE5OOmL4G8xDcaKRpCNo=	\N	t	andrew	Andrew	Pold		t	t	2023-09-27 22:08:24.125613-05	1
2	pbkdf2_sha256$600000$tNoWOXjTwQYnhtklT6Kp1X$GxR65ifvHynoX5dl6Nv/6m0fsRkiLOlaHwniLuiVloU=	2023-09-27 22:40:56.19877-05	t	qwerty				t	t	2023-09-27 22:08:50.584673-05	2
\.


--
-- Data for Name: cuenta_user_groups; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.cuenta_user_groups (id, user_id, group_id) FROM stdin;
2	1	3
\.


--
-- Data for Name: cuenta_user_user_permissions; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.cuenta_user_user_permissions (id, user_id, permission_id) FROM stdin;
\.


--
-- Data for Name: django_admin_log; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.django_admin_log (id, action_time, object_id, object_repr, action_flag, change_message, content_type_id, user_id) FROM stdin;
\.


--
-- Data for Name: django_migrations; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.django_migrations (id, app, name, applied) FROM stdin;
1	contenttypes	0001_initial	2023-09-27 22:16:32.889033-05
2	contenttypes	0002_remove_content_type_name	2023-09-27 22:16:32.899016-05
3	auth	0001_initial	2023-09-27 22:16:32.943542-05
4	auth	0002_alter_permission_name_max_length	2023-09-27 22:16:32.949641-05
5	auth	0003_alter_user_email_max_length	2023-09-27 22:16:32.956317-05
6	auth	0004_alter_user_username_opts	2023-09-27 22:16:32.963022-05
7	auth	0005_alter_user_last_login_null	2023-09-27 22:16:32.970618-05
8	auth	0006_require_contenttypes_0002	2023-09-27 22:16:32.973095-05
9	auth	0007_alter_validators_add_error_messages	2023-09-27 22:16:32.981656-05
10	auth	0008_alter_user_username_max_length	2023-09-27 22:16:32.990896-05
11	auth	0009_alter_user_last_name_max_length	2023-09-27 22:16:33.003012-05
12	auth	0010_alter_group_name_max_length	2023-09-27 22:16:33.014251-05
13	auth	0011_update_proxy_permissions	2023-09-27 22:16:33.021726-05
14	auth	0012_alter_user_first_name_max_length	2023-09-27 22:16:33.030265-05
15	cuenta	0001_initial	2023-09-27 22:16:33.131683-05
16	admin	0001_initial	2023-09-27 22:16:33.16767-05
17	admin	0002_logentry_remove_auto_add	2023-09-27 22:16:33.18635-05
18	admin	0003_logentry_add_action_flag_choices	2023-09-27 22:16:33.207658-05
19	marketing	0001_initial	2023-09-27 22:16:33.306838-05
20	sessions	0001_initial	2023-09-27 22:16:33.322699-05
21	token_blacklist	0001_initial	2023-09-27 22:16:33.399244-05
22	token_blacklist	0002_outstandingtoken_jti_hex	2023-09-27 22:16:33.422609-05
23	token_blacklist	0003_auto_20171017_2007	2023-09-27 22:16:33.45824-05
24	token_blacklist	0004_auto_20171017_2013	2023-09-27 22:16:33.485484-05
25	token_blacklist	0005_remove_outstandingtoken_jti	2023-09-27 22:16:33.506996-05
26	token_blacklist	0006_auto_20171017_2113	2023-09-27 22:16:33.526039-05
27	token_blacklist	0007_auto_20171017_2214	2023-09-27 22:16:33.579917-05
28	token_blacklist	0008_migrate_to_bigautofield	2023-09-27 22:16:33.665923-05
29	token_blacklist	0010_fix_migrate_to_bigautofield	2023-09-27 22:16:33.701261-05
30	token_blacklist	0011_linearizes_history	2023-09-27 22:16:33.707801-05
31	token_blacklist	0012_alter_outstandingtoken_user	2023-09-27 22:16:33.735793-05
32	ventas	0001_initial	2023-09-27 22:16:34.0603-05
33	ventas	0002_objecion_codigo	2023-09-27 22:46:56.47468-05
\.


--
-- Data for Name: django_session; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.django_session (session_key, session_data, expire_date) FROM stdin;
ktytajfja05rd2dq7abdkws658oqjek8	.eJxVjDsOwjAQBe_iGlleY_yhpOcM1q53jQMokeKkQtwdIqWA9s3Me6mM69Ly2mXOA6uzsurwuxGWh4wb4DuOt0mXaVzmgfSm6J12fZ1Ynpfd_Tto2Nu3TtWSWHRQg6scT0dOMRAUiB4gUXVgYiFfgbmIFxfQSiWTPGAKJop6fwDv9zhA:1qlhtY:9vbYNskxWyUpSUR0KEAmaOLWxzUc6Dgw8O8QDyckd2A	2023-10-11 22:40:56.20189-05
\.


--
-- Data for Name: marketing_categoria; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.marketing_categoria (id, nombre, estado_id) FROM stdin;
\.


--
-- Data for Name: marketing_proyecto; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.marketing_proyecto (id, nombre, ubicacion, descripcion, estado_id) FROM stdin;
\.


--
-- Data for Name: marketing_campania; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.marketing_campania (id, nombre, fecha_creacion, fecha_estimada, fecha_cierre, coste_estimado, coste_real, descripcion, categoria_id, estado_id, proyecto_id) FROM stdin;
\.


--
-- Data for Name: token_blacklist_outstandingtoken; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.token_blacklist_outstandingtoken (id, token, created_at, expires_at, user_id, jti) FROM stdin;
\.


--
-- Data for Name: token_blacklist_blacklistedtoken; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.token_blacklist_blacklistedtoken (id, blacklisted_at, token_id) FROM stdin;
\.


--
-- Data for Name: ventas_asesor; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.ventas_asesor (id, codigo, "numeroLeads", "maximoLeads", "fechaCreado", "fechaActualizado", estado_id, user_id) FROM stdin;
\.


--
-- Data for Name: ventas_estadolead; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.ventas_estadolead (nombre, descripcion, estado_id) FROM stdin;
NR	No responde	A
EP	En proceso	A
FR	Frio	A
TB	Tibio	A
CH	Caliente	A
SE	Separaciones	A
CI	Cierre	A
\.


--
-- Data for Name: ventas_objecion; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.ventas_objecion (id, nombre, estado_id, codigo) FROM stdin;
1	Ninguna	A	NN
2	Precio	A	PR
3	No indica / No Interesado	A	NI
4	Ocupado / Trabajando	A	OT
6	Solo mensajes / Wsp	A	SM
7	Inmediatez	A	IM
8	No contesta / Apagado	A	NC
9	Equivocado / No existe	A	EN
10	'Playa/Campo / Casa	A	PC
5	Ubicación	A	UB
\.


--
-- Data for Name: ventas_lead; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.ventas_lead (id, nombre, apellido, asignado, celular, celular2, telefono, comentario, "horaEntrega", llamar, asesor_id, campania_id, estado_id, "estadoLead_id", objecion_id) FROM stdin;
\.


--
-- Data for Name: ventas_llamada; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.ventas_llamada (id, detalle, estado_id, lead_id) FROM stdin;
\.


--
-- Data for Name: ventas_whatsapp; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.ventas_whatsapp (id, detalle, estado_id, lead_id) FROM stdin;
\.


--
-- Name: auth_group_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.auth_group_id_seq', 4, true);


--
-- Name: auth_group_permissions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.auth_group_permissions_id_seq', 34, true);


--
-- Name: auth_permission_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.auth_permission_id_seq', 80, true);


--
-- Name: cuenta_modulo_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.cuenta_modulo_id_seq', 5, true);


--
-- Name: cuenta_profile_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.cuenta_profile_id_seq', 1, false);


--
-- Name: cuenta_user_groups_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.cuenta_user_groups_id_seq', 2, true);


--
-- Name: cuenta_user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.cuenta_user_id_seq', 2, true);


--
-- Name: cuenta_user_user_permissions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.cuenta_user_user_permissions_id_seq', 1, false);


--
-- Name: django_admin_log_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.django_admin_log_id_seq', 1, false);


--
-- Name: django_content_type_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.django_content_type_id_seq', 20, true);


--
-- Name: django_migrations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.django_migrations_id_seq', 33, true);


--
-- Name: marketing_campania_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.marketing_campania_id_seq', 1, false);


--
-- Name: marketing_categoria_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.marketing_categoria_id_seq', 1, false);


--
-- Name: marketing_proyecto_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.marketing_proyecto_id_seq', 1, false);


--
-- Name: token_blacklist_blacklistedtoken_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.token_blacklist_blacklistedtoken_id_seq', 1, false);


--
-- Name: token_blacklist_outstandingtoken_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.token_blacklist_outstandingtoken_id_seq', 1, false);


--
-- Name: ventas_asesor_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.ventas_asesor_id_seq', 1, false);


--
-- Name: ventas_lead_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.ventas_lead_id_seq', 1, false);


--
-- Name: ventas_llamada_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.ventas_llamada_id_seq', 1, false);


--
-- Name: ventas_objecion_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.ventas_objecion_id_seq', 10, true);


--
-- Name: ventas_whatsapp_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.ventas_whatsapp_id_seq', 1, false);


--
-- PostgreSQL database dump complete
--

