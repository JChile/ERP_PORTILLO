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
2	marketing
3	recursos_humanos
4	jefe_ventas
1	asesor
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
12	ventas	cotizacion
13	ventas	estadolead
14	ventas	lead
15	ventas	whatsapp
16	ventas	tipoproducto
17	ventas	tipoevento
18	ventas	tipocuota
19	ventas	tipocotizacion
20	ventas	proyectotipoproducto
21	ventas	producto
22	ventas	precio
23	ventas	objecion
24	ventas	llamada
25	ventas	historicoleadasesor
26	ventas	evento
27	ventas	cuota
28	token_blacklist	blacklistedtoken
29	token_blacklist	outstandingtoken
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
45	Can add cotizacion	12	add_cotizacion
46	Can change cotizacion	12	change_cotizacion
47	Can delete cotizacion	12	delete_cotizacion
48	Can view cotizacion	12	view_cotizacion
49	Can add estado lead	13	add_estadolead
50	Can change estado lead	13	change_estadolead
51	Can delete estado lead	13	delete_estadolead
52	Can view estado lead	13	view_estadolead
53	Can add lead	14	add_lead
54	Can change lead	14	change_lead
55	Can delete lead	14	delete_lead
56	Can view lead	14	view_lead
57	Can add whats app	15	add_whatsapp
58	Can change whats app	15	change_whatsapp
59	Can delete whats app	15	delete_whatsapp
60	Can view whats app	15	view_whatsapp
61	Can add tipo producto	16	add_tipoproducto
62	Can change tipo producto	16	change_tipoproducto
63	Can delete tipo producto	16	delete_tipoproducto
64	Can view tipo producto	16	view_tipoproducto
65	Can add tipo evento	17	add_tipoevento
66	Can change tipo evento	17	change_tipoevento
67	Can delete tipo evento	17	delete_tipoevento
68	Can view tipo evento	17	view_tipoevento
69	Can add tipo cuota	18	add_tipocuota
70	Can change tipo cuota	18	change_tipocuota
71	Can delete tipo cuota	18	delete_tipocuota
72	Can view tipo cuota	18	view_tipocuota
73	Can add tipo cotizacion	19	add_tipocotizacion
74	Can change tipo cotizacion	19	change_tipocotizacion
75	Can delete tipo cotizacion	19	delete_tipocotizacion
76	Can view tipo cotizacion	19	view_tipocotizacion
77	Can add proyecto tipo producto	20	add_proyectotipoproducto
78	Can change proyecto tipo producto	20	change_proyectotipoproducto
79	Can delete proyecto tipo producto	20	delete_proyectotipoproducto
80	Can view proyecto tipo producto	20	view_proyectotipoproducto
81	Can add producto	21	add_producto
82	Can change producto	21	change_producto
83	Can delete producto	21	delete_producto
84	Can view producto	21	view_producto
85	Can add precio	22	add_precio
86	Can change precio	22	change_precio
87	Can delete precio	22	delete_precio
88	Can view precio	22	view_precio
89	Can add objecion	23	add_objecion
90	Can change objecion	23	change_objecion
91	Can delete objecion	23	delete_objecion
92	Can view objecion	23	view_objecion
93	Can add llamada	24	add_llamada
94	Can change llamada	24	change_llamada
95	Can delete llamada	24	delete_llamada
96	Can view llamada	24	view_llamada
97	Can add historico lead asesor	25	add_historicoleadasesor
98	Can change historico lead asesor	25	change_historicoleadasesor
99	Can delete historico lead asesor	25	delete_historicoleadasesor
100	Can view historico lead asesor	25	view_historicoleadasesor
101	Can add evento	26	add_evento
102	Can change evento	26	change_evento
103	Can delete evento	26	delete_evento
104	Can view evento	26	view_evento
105	Can add cuota	27	add_cuota
106	Can change cuota	27	change_cuota
107	Can delete cuota	27	delete_cuota
108	Can view cuota	27	view_cuota
109	Can add blacklisted token	28	add_blacklistedtoken
110	Can change blacklisted token	28	change_blacklistedtoken
111	Can delete blacklisted token	28	delete_blacklistedtoken
112	Can view blacklisted token	28	view_blacklistedtoken
113	Can add outstanding token	29	add_outstandingtoken
114	Can change outstanding token	29	change_outstandingtoken
115	Can delete outstanding token	29	delete_outstandingtoken
116	Can view outstanding token	29	view_outstandingtoken
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
29	3	9
30	3	10
31	3	11
32	3	12
33	3	41
34	3	42
35	3	43
36	3	44
37	3	105
38	3	106
39	3	107
40	3	108
41	3	57
42	3	58
43	3	59
44	3	60
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

COPY public.cuenta_user (id, password, last_login, is_superuser, username, first_name, last_name, email, is_staff, is_active, date_joined, "codigoAsesor", estado_id, proyecto_id) FROM stdin;
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
\.


--
-- Data for Name: django_migrations; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.django_migrations (id, app, name, applied) FROM stdin;
1	contenttypes	0001_initial	2024-01-02 22:20:13.824292-05
2	contenttypes	0002_remove_content_type_name	2024-01-02 22:20:13.835529-05
3	auth	0001_initial	2024-01-02 22:20:13.898942-05
4	auth	0002_alter_permission_name_max_length	2024-01-02 22:20:13.907069-05
5	auth	0003_alter_user_email_max_length	2024-01-02 22:20:13.917642-05
6	auth	0004_alter_user_username_opts	2024-01-02 22:20:13.932471-05
7	auth	0005_alter_user_last_login_null	2024-01-02 22:20:13.947664-05
8	auth	0006_require_contenttypes_0002	2024-01-02 22:20:13.955991-05
9	auth	0007_alter_validators_add_error_messages	2024-01-02 22:20:13.969524-05
10	auth	0008_alter_user_username_max_length	2024-01-02 22:20:13.99527-05
11	auth	0009_alter_user_last_name_max_length	2024-01-02 22:20:14.013377-05
12	auth	0010_alter_group_name_max_length	2024-01-02 22:20:14.033918-05
13	auth	0011_update_proxy_permissions	2024-01-02 22:20:14.06357-05
14	auth	0012_alter_user_first_name_max_length	2024-01-02 22:20:14.082025-05
15	cuenta	0001_initial	2024-01-02 22:20:14.190201-05
16	admin	0001_initial	2024-01-02 22:20:14.227452-05
17	admin	0002_logentry_remove_auto_add	2024-01-02 22:20:14.24153-05
18	admin	0003_logentry_add_action_flag_choices	2024-01-02 22:20:14.268579-05
19	marketing	0001_initial	2024-01-02 22:20:14.42785-05
20	cuenta	0002_initial	2024-01-02 22:20:14.512638-05
21	sessions	0001_initial	2024-01-02 22:20:14.528626-05
22	token_blacklist	0001_initial	2024-01-02 22:20:14.613414-05
23	token_blacklist	0002_outstandingtoken_jti_hex	2024-01-02 22:20:14.632437-05
24	token_blacklist	0003_auto_20171017_2007	2024-01-02 22:20:14.662763-05
25	token_blacklist	0004_auto_20171017_2013	2024-01-02 22:20:14.70409-05
26	token_blacklist	0005_remove_outstandingtoken_jti	2024-01-02 22:20:14.723097-05
27	token_blacklist	0006_auto_20171017_2113	2024-01-02 22:20:14.770572-05
28	token_blacklist	0007_auto_20171017_2214	2024-01-02 22:20:14.823487-05
29	token_blacklist	0008_migrate_to_bigautofield	2024-01-02 22:20:14.891302-05
30	token_blacklist	0010_fix_migrate_to_bigautofield	2024-01-02 22:20:14.972047-05
31	token_blacklist	0011_linearizes_history	2024-01-02 22:20:14.981333-05
32	token_blacklist	0012_alter_outstandingtoken_user	2024-01-02 22:20:15.012151-05
33	ventas	0001_initial	2024-01-02 22:20:16.080389-05
\.


--
-- Data for Name: django_session; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.django_session (session_key, session_data, expire_date) FROM stdin;
diwakbnjte67rjti14p9qc62gcz028kl	.eJxVjDsOwjAQBe_iGlnxP6ak5wzWZneNA8iW4qRC3B0ipYD2zcx7iQTbWtLWeUkzibPQ4vS7TYAPrjugO9Rbk9jqusyT3BV50C6vjfh5Ody_gwK9fOuoRg5ORySyYHVgT07lTMpkcsgUCA2GaCDoPGD2HDWOExkbwQcasnh_AP9sONw:1rJbk9:e1fs76rC7obSZPfG7kNQDyguzctz6wVKyQ3dxw1tpkE	2024-01-13 10:59:21.246485-05
\.


--
-- Data for Name: marketing_categoria; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.marketing_categoria (id, nombre, estado_id) FROM stdin;
1	Facebook	A
2	Fisico	A
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

COPY public.ventas_objecion (id, nombre, estado_id) FROM stdin;
1	Ninguna	A
2	Precio	A
3	No indica / No Interesado	A
4	Ocupado / Trabajando	A
6	Solo mensajes / Wsp	A
7	Inmediatez	A
8	No contesta / Apagado	A
9	Equivocado / No existe	A
5	Ubicación	A
10	Playa/Campo / Casa	A
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
1	Firma de contrato	A
2	Visita	A
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

SELECT pg_catalog.setval('public.auth_group_permissions_id_seq', 44, true);


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

SELECT pg_catalog.setval('public.cuenta_user_groups_id_seq', 14, true);


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

SELECT pg_catalog.setval('public.django_admin_log_id_seq', 83, true);


--
-- Name: django_content_type_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.django_content_type_id_seq', 30, true);


--
-- Name: django_migrations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.django_migrations_id_seq', 37, true);


--
-- Name: marketing_campania_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.marketing_campania_id_seq', 3, true);


--
-- Name: marketing_categoria_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.marketing_categoria_id_seq', 2, true);


--
-- Name: marketing_proyecto_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.marketing_proyecto_id_seq', 2, true);


--
-- Name: token_blacklist_blacklistedtoken_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.token_blacklist_blacklistedtoken_id_seq', 1, false);


--
-- Name: token_blacklist_outstandingtoken_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.token_blacklist_outstandingtoken_id_seq', 58, true);


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

SELECT pg_catalog.setval('public.ventas_evento_id_seq', 1, true);


--
-- Name: ventas_historicoleadasesor_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.ventas_historicoleadasesor_id_seq', 1, false);


--
-- Name: ventas_lead_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.ventas_lead_id_seq', 10, true);


--
-- Name: ventas_llamada_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.ventas_llamada_id_seq', 1, true);


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

SELECT pg_catalog.setval('public.ventas_tipoevento_id_seq', 2, true);


--
-- Name: ventas_tipoproducto_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.ventas_tipoproducto_id_seq', 1, false);


--
-- Name: ventas_whatsapp_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.ventas_whatsapp_id_seq', 2, true);


--
-- PostgreSQL database dump complete
--

