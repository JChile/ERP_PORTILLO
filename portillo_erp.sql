--
-- PostgreSQL database dump
--

-- Dumped from database version 14.10 (Ubuntu 14.10-0ubuntu0.22.04.1)
-- Dumped by pg_dump version 14.10 (Ubuntu 14.10-0ubuntu0.22.04.1)

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
4	Jefe de Ventas
2	Marketing
1	Asesor
3	Recursos Humanos
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
7	cuenta	modulo
8	cuenta	user
9	marketing	proyecto
10	marketing	categoria
11	marketing	campania
12	ventas	asesor
13	ventas	cotizacion
14	ventas	estadolead
15	ventas	lead
16	ventas	whatsapp
17	ventas	tipoproducto
18	ventas	tipoevento
19	ventas	tipocuota
20	ventas	tipocotizacion
21	ventas	proyectotipoproducto
22	ventas	producto
23	ventas	precio
24	ventas	objecion
25	ventas	llamada
26	ventas	historicoleadasesor
27	ventas	evento
28	ventas	cuota
29	token_blacklist	blacklistedtoken
30	token_blacklist	outstandingtoken
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
25	Can add modulo	7	add_modulo
26	Can change modulo	7	change_modulo
27	Can delete modulo	7	delete_modulo
28	Can view modulo	7	view_modulo
29	Can add user	8	add_user
30	Can change user	8	change_user
31	Can delete user	8	delete_user
32	Can view user	8	view_user
33	Can add proyecto	9	add_proyecto
34	Can change proyecto	9	change_proyecto
35	Can delete proyecto	9	delete_proyecto
36	Can view proyecto	9	view_proyecto
37	Can add categoria	10	add_categoria
38	Can change categoria	10	change_categoria
39	Can delete categoria	10	delete_categoria
40	Can view categoria	10	view_categoria
41	Can add campania	11	add_campania
42	Can change campania	11	change_campania
43	Can delete campania	11	delete_campania
44	Can view campania	11	view_campania
45	Can add asesor	12	add_asesor
46	Can change asesor	12	change_asesor
47	Can delete asesor	12	delete_asesor
48	Can view asesor	12	view_asesor
49	Can add cotizacion	13	add_cotizacion
50	Can change cotizacion	13	change_cotizacion
51	Can delete cotizacion	13	delete_cotizacion
52	Can view cotizacion	13	view_cotizacion
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
65	Can add tipo producto	17	add_tipoproducto
66	Can change tipo producto	17	change_tipoproducto
67	Can delete tipo producto	17	delete_tipoproducto
68	Can view tipo producto	17	view_tipoproducto
69	Can add tipo evento	18	add_tipoevento
70	Can change tipo evento	18	change_tipoevento
71	Can delete tipo evento	18	delete_tipoevento
72	Can view tipo evento	18	view_tipoevento
73	Can add tipo cuota	19	add_tipocuota
74	Can change tipo cuota	19	change_tipocuota
75	Can delete tipo cuota	19	delete_tipocuota
76	Can view tipo cuota	19	view_tipocuota
77	Can add tipo cotizacion	20	add_tipocotizacion
78	Can change tipo cotizacion	20	change_tipocotizacion
79	Can delete tipo cotizacion	20	delete_tipocotizacion
80	Can view tipo cotizacion	20	view_tipocotizacion
81	Can add proyecto tipo producto	21	add_proyectotipoproducto
82	Can change proyecto tipo producto	21	change_proyectotipoproducto
83	Can delete proyecto tipo producto	21	delete_proyectotipoproducto
84	Can view proyecto tipo producto	21	view_proyectotipoproducto
85	Can add producto	22	add_producto
86	Can change producto	22	change_producto
87	Can delete producto	22	delete_producto
88	Can view producto	22	view_producto
89	Can add precio	23	add_precio
90	Can change precio	23	change_precio
91	Can delete precio	23	delete_precio
92	Can view precio	23	view_precio
93	Can add objecion	24	add_objecion
94	Can change objecion	24	change_objecion
95	Can delete objecion	24	delete_objecion
96	Can view objecion	24	view_objecion
97	Can add llamada	25	add_llamada
98	Can change llamada	25	change_llamada
99	Can delete llamada	25	delete_llamada
100	Can view llamada	25	view_llamada
101	Can add historico lead asesor	26	add_historicoleadasesor
102	Can change historico lead asesor	26	change_historicoleadasesor
103	Can delete historico lead asesor	26	delete_historicoleadasesor
104	Can view historico lead asesor	26	view_historicoleadasesor
105	Can add evento	27	add_evento
106	Can change evento	27	change_evento
107	Can delete evento	27	delete_evento
108	Can view evento	27	view_evento
109	Can add cuota	28	add_cuota
110	Can change cuota	28	change_cuota
111	Can delete cuota	28	delete_cuota
112	Can view cuota	28	view_cuota
113	Can add blacklisted token	29	add_blacklistedtoken
114	Can change blacklisted token	29	change_blacklistedtoken
115	Can delete blacklisted token	29	delete_blacklistedtoken
116	Can view blacklisted token	29	view_blacklistedtoken
117	Can add outstanding token	30	add_outstandingtoken
118	Can change outstanding token	30	change_outstandingtoken
119	Can delete outstanding token	30	delete_outstandingtoken
120	Can view outstanding token	30	view_outstandingtoken
\.


--
-- Data for Name: auth_group_permissions; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.auth_group_permissions (id, group_id, permission_id) FROM stdin;
5	4	57
6	4	58
7	4	59
8	4	60
9	3	32
10	3	29
11	3	30
12	3	31
13	2	41
14	2	42
15	2	43
16	2	44
17	1	57
18	1	58
19	1	59
20	1	60
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

COPY public.cuenta_modulo (id, nombre, url, "contentType_id", estado_id) FROM stdin;
7	Gestión de leads	lead	15	A
2	Gestion de campañas	campania	11	A
3	Gestion de roles	rol	3	A
5	Gestion de usuarios	usuario	8	A
6	Gestion de eventos	evento	27	A
\.


--
-- Data for Name: cuenta_user; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.cuenta_user (id, password, last_login, is_superuser, username, first_name, last_name, email, is_staff, is_active, date_joined, "codigoAsesor") FROM stdin;
1	pbkdf2_sha256$600000$BMJ8LF8DGDtK75g1jlAJbH$pvS/k25Y+f0BUQQBOycCYkIImuQJm/vZkxb3UI3Qpzg=	\N	t	andrew				t	t	2023-12-29 14:19:22.553758-05	\N
2	pbkdf2_sha256$600000$Ntgg4ISllhxBbS1dKBkaxF$NDEQuIj95L9YZlaRkumq6mh4nhjUnNnndDsjMahaQj8=	2023-12-29 14:20:01.36138-05	t	qwerty				t	t	2023-12-29 14:19:38.462092-05	\N
\.


--
-- Data for Name: cuenta_user_groups; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.cuenta_user_groups (id, user_id, group_id) FROM stdin;
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
1	2023-12-29 14:20:10.353627-05	4	Gestión de asesores	3		7	2
2	2023-12-29 14:26:33.410287-05	4	Jefe de Ventas	2	[]	3	2
3	2023-12-29 14:29:18.974981-05	4	Jefe de Ventas	2	[{"changed": {"fields": ["Permissions"]}}]	3	2
4	2023-12-29 14:33:11.783996-05	4	Jefe de Ventas	2	[{"changed": {"fields": ["Permissions"]}}]	3	2
5	2023-12-29 14:33:56.967211-05	3	Jefe de Recursos Humanos	2	[{"changed": {"fields": ["Permissions"]}}]	3	2
6	2023-12-29 14:34:26.119902-05	4	Jefe de Ventas	2	[]	3	2
7	2023-12-29 14:35:19.008283-05	2	Asistente de marketing	2	[{"changed": {"fields": ["Permissions"]}}]	3	2
8	2023-12-29 14:36:14.198162-05	1	Jefe de Marketing	3		3	2
9	2023-12-29 14:36:36.9574-05	1	Asesor	1	[{"added": {}}]	3	2
10	2023-12-29 14:36:46.914828-05	3	Recursos Humanos	2	[{"changed": {"fields": ["Name"]}}]	3	2
11	2023-12-29 14:36:57.750479-05	2	Marketing	2	[{"changed": {"fields": ["Name"]}}]	3	2
12	2023-12-29 14:37:26.181598-05	1	Asesor	2	[{"changed": {"fields": ["Permissions"]}}]	3	2
13	2023-12-29 14:37:46.919622-05	3	Recursos Humanos	2	[]	3	2
\.


--
-- Data for Name: django_migrations; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.django_migrations (id, app, name, applied) FROM stdin;
1	contenttypes	0001_initial	2023-12-29 14:10:10.342532-05
2	contenttypes	0002_remove_content_type_name	2023-12-29 14:10:10.355712-05
3	auth	0001_initial	2023-12-29 14:10:10.407606-05
4	auth	0002_alter_permission_name_max_length	2023-12-29 14:10:10.415979-05
5	auth	0003_alter_user_email_max_length	2023-12-29 14:10:10.425322-05
6	auth	0004_alter_user_username_opts	2023-12-29 14:10:10.434346-05
7	auth	0005_alter_user_last_login_null	2023-12-29 14:10:10.441505-05
8	auth	0006_require_contenttypes_0002	2023-12-29 14:10:10.445023-05
9	auth	0007_alter_validators_add_error_messages	2023-12-29 14:10:10.460671-05
10	auth	0008_alter_user_username_max_length	2023-12-29 14:10:10.473612-05
11	auth	0009_alter_user_last_name_max_length	2023-12-29 14:10:10.492157-05
12	auth	0010_alter_group_name_max_length	2023-12-29 14:10:10.507298-05
13	auth	0011_update_proxy_permissions	2023-12-29 14:10:10.519443-05
14	auth	0012_alter_user_first_name_max_length	2023-12-29 14:10:10.532334-05
15	cuenta	0001_initial	2023-12-29 14:10:10.624259-05
16	admin	0001_initial	2023-12-29 14:10:10.6658-05
17	admin	0002_logentry_remove_auto_add	2023-12-29 14:10:10.682659-05
18	admin	0003_logentry_add_action_flag_choices	2023-12-29 14:10:10.709037-05
19	marketing	0001_initial	2023-12-29 14:10:10.833275-05
20	sessions	0001_initial	2023-12-29 14:10:10.852216-05
21	token_blacklist	0001_initial	2023-12-29 14:10:10.905283-05
22	token_blacklist	0002_outstandingtoken_jti_hex	2023-12-29 14:10:10.918835-05
23	token_blacklist	0003_auto_20171017_2007	2023-12-29 14:10:10.953886-05
24	token_blacklist	0004_auto_20171017_2013	2023-12-29 14:10:10.9802-05
25	token_blacklist	0005_remove_outstandingtoken_jti	2023-12-29 14:10:11.005405-05
26	token_blacklist	0006_auto_20171017_2113	2023-12-29 14:10:11.033152-05
27	token_blacklist	0007_auto_20171017_2214	2023-12-29 14:10:11.101788-05
28	token_blacklist	0008_migrate_to_bigautofield	2023-12-29 14:10:11.179349-05
29	token_blacklist	0010_fix_migrate_to_bigautofield	2023-12-29 14:10:11.220386-05
30	token_blacklist	0011_linearizes_history	2023-12-29 14:10:11.224349-05
31	token_blacklist	0012_alter_outstandingtoken_user	2023-12-29 14:10:11.258663-05
32	ventas	0001_initial	2023-12-29 14:10:12.352215-05
\.


--
-- Data for Name: django_session; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.django_session (session_key, session_data, expire_date) FROM stdin;
hwig3x1c5fad0mhd3zbxihjq7hbofaj4	.eJxVjDsOwjAQBe_iGlnxP6ak5wzWZneNA8iW4qRC3B0ipYD2zcx7iQTbWtLWeUkzibPQ4vS7TYAPrjugO9Rbk9jqusyT3BV50C6vjfh5Ody_gwK9fOuoRg5ORySyYHVgT07lTMpkcsgUCA2GaCDoPGD2HDWOExkbwQcasnh_AP9sONw:1rJIOn:84bRd1IwCuRPMdtUcFtNnY3KicKcR6ydX-zK8KZ_11I	2024-01-12 14:20:01.364042-05
\.


--
-- Data for Name: marketing_categoria; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.marketing_categoria (id, nombre, estado_id) FROM stdin;
\.


--
-- Data for Name: marketing_proyecto; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.marketing_proyecto (id, nombre, ubicacion, descripcion, fecha_creacion, fecha_actualizacion, estado_id, "usuarioActualizador_id", "usuarioCreador_id") FROM stdin;
\.


--
-- Data for Name: marketing_campania; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.marketing_campania (id, nombre, codigo, fecha_creacion, fecha_estimada, fecha_cierre, coste_estimado, coste_real, descripcion, fecha_actualizacion, categoria_id, estado_id, proyecto_id, "usuarioActualizador_id", "usuarioCreador_id") FROM stdin;
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
-- Data for Name: ventas_tipocotizacion; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.ventas_tipocotizacion (id, nombre, estado_id) FROM stdin;
\.


--
-- Data for Name: ventas_cotizacion; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.ventas_cotizacion (id, nombre, fecha, duracion, estado_id, proyecto_id, tipo_id) FROM stdin;
\.


--
-- Data for Name: ventas_tipocuota; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.ventas_tipocuota (id, nombre, estado_id) FROM stdin;
\.


--
-- Data for Name: ventas_cuota; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.ventas_cuota (id, numero, tiempo, porcentaje, fecha, cotizacion_id, estado_id, tipo_id) FROM stdin;
\.


--
-- Data for Name: ventas_estadolead; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.ventas_estadolead (nombre, descripcion, estado_id) FROM stdin;
\.


--
-- Data for Name: ventas_objecion; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.ventas_objecion (id, nombre, estado_id) FROM stdin;
\.


--
-- Data for Name: ventas_lead; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.ventas_lead (id, nombre, apellido, asignado, celular, celular2, comentario, "horaRecepcion", llamar, "recienCreado", fecha_creacion, fecha_actualizacion, asesor_id, campania_id, estado_id, "estadoLead_id", objecion_id, "usuarioActualizador_id", "usuarioCreador_id") FROM stdin;
\.


--
-- Data for Name: ventas_tipoevento; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.ventas_tipoevento (id, nombre, estado_id) FROM stdin;
\.


--
-- Data for Name: ventas_evento; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.ventas_evento (id, titulo, duracion, fecha_visita, ubicacion, descripcion, fecha_creacion, fecha_actualizacion, asesor_id, estado_id, lead_id, proyecto_id, tipo_id, "usuarioActualizador_id", "usuarioCreador_id") FROM stdin;
\.


--
-- Data for Name: ventas_historicoleadasesor; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.ventas_historicoleadasesor (id, fecha_creacion, lead_id, usuario_id) FROM stdin;
\.


--
-- Data for Name: ventas_llamada; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.ventas_llamada (id, detalle, fecha_creacion, fecha_actualizacion, estado_id, lead_id, "usuarioActualizador_id", "usuarioCreador_id") FROM stdin;
\.


--
-- Data for Name: ventas_tipoproducto; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.ventas_tipoproducto (id, nombre, estado_id) FROM stdin;
\.


--
-- Data for Name: ventas_precio; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.ventas_precio (id, precio, cotizacion_id, estado_id, "tipoProducto_id") FROM stdin;
\.


--
-- Data for Name: ventas_producto; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.ventas_producto (id, nombre, codigo, numero, area, fecha_creacion, fecha_actualizacion, estado_id, proyecto_id, tipo_id, "usuarioActualizador_id", "usuarioCreador_id") FROM stdin;
\.


--
-- Data for Name: ventas_proyectotipoproducto; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.ventas_proyectotipoproducto (id, proyecto_id, tipo_producto_id) FROM stdin;
\.


--
-- Data for Name: ventas_whatsapp; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.ventas_whatsapp (id, detalle, fecha_creacion, fecha_actualizacion, estado_id, lead_id, "usuarioActualizador_id", "usuarioCreador_id") FROM stdin;
\.


--
-- Name: auth_group_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.auth_group_id_seq', 1, true);


--
-- Name: auth_group_permissions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.auth_group_permissions_id_seq', 20, true);


--
-- Name: auth_permission_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.auth_permission_id_seq', 120, true);


--
-- Name: cuenta_modulo_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.cuenta_modulo_id_seq', 1, false);


--
-- Name: cuenta_user_groups_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.cuenta_user_groups_id_seq', 1, false);


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

SELECT pg_catalog.setval('public.django_admin_log_id_seq', 13, true);


--
-- Name: django_content_type_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.django_content_type_id_seq', 30, true);


--
-- Name: django_migrations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.django_migrations_id_seq', 32, true);


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
-- Name: ventas_cotizacion_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.ventas_cotizacion_id_seq', 1, false);


--
-- Name: ventas_cuota_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.ventas_cuota_id_seq', 1, false);


--
-- Name: ventas_evento_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.ventas_evento_id_seq', 1, false);


--
-- Name: ventas_historicoleadasesor_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.ventas_historicoleadasesor_id_seq', 1, false);


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

SELECT pg_catalog.setval('public.ventas_objecion_id_seq', 1, false);


--
-- Name: ventas_precio_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.ventas_precio_id_seq', 1, false);


--
-- Name: ventas_producto_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.ventas_producto_id_seq', 1, false);


--
-- Name: ventas_proyectotipoproducto_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.ventas_proyectotipoproducto_id_seq', 1, false);


--
-- Name: ventas_tipocotizacion_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.ventas_tipocotizacion_id_seq', 1, false);


--
-- Name: ventas_tipocuota_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.ventas_tipocuota_id_seq', 1, false);


--
-- Name: ventas_tipoevento_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.ventas_tipoevento_id_seq', 1, false);


--
-- Name: ventas_tipoproducto_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.ventas_tipoproducto_id_seq', 1, false);


--
-- Name: ventas_whatsapp_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.ventas_whatsapp_id_seq', 1, false);


--
-- PostgreSQL database dump complete
--

