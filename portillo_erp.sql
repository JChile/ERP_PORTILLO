--
-- PostgreSQL database dump
--

-- Dumped from database version 15.4
-- Dumped by pg_dump version 15.4

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
4	jefe_ventas
2	marketing
1	asesor
3	administrador
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
13	ventas	estadoevento
14	ventas	estadolead
15	ventas	lead
16	ventas	objecion
17	ventas	whatsapp
18	ventas	tipoproducto
19	ventas	tipoevento
20	ventas	tipocuota
21	ventas	tipocotizacion
22	ventas	proyectotipoproducto
23	ventas	producto
24	ventas	precio
25	ventas	llamada
26	ventas	historicoleadasesor
27	ventas	evento
28	ventas	desasignacionleadasesor
29	ventas	cuota
30	multimedia	videoproyecto
31	multimedia	videoproducto
32	multimedia	imagenproyecto
33	multimedia	imagenproducto
34	token_blacklist	blacklistedtoken
35	token_blacklist	outstandingtoken
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
49	Can add estado evento	13	add_estadoevento
50	Can change estado evento	13	change_estadoevento
51	Can delete estado evento	13	delete_estadoevento
52	Can view estado evento	13	view_estadoevento
53	Can add estado lead	14	add_estadolead
54	Can change estado lead	14	change_estadolead
55	Can delete estado lead	14	delete_estadolead
56	Can view estado lead	14	view_estadolead
57	Can add lead	15	add_lead
58	Can change lead	15	change_lead
59	Can delete lead	15	delete_lead
60	Can view lead	15	view_lead
61	Can add objecion	16	add_objecion
62	Can change objecion	16	change_objecion
63	Can delete objecion	16	delete_objecion
64	Can view objecion	16	view_objecion
65	Can add whats app	17	add_whatsapp
66	Can change whats app	17	change_whatsapp
67	Can delete whats app	17	delete_whatsapp
68	Can view whats app	17	view_whatsapp
69	Can add tipo producto	18	add_tipoproducto
70	Can change tipo producto	18	change_tipoproducto
71	Can delete tipo producto	18	delete_tipoproducto
72	Can view tipo producto	18	view_tipoproducto
73	Can add tipo evento	19	add_tipoevento
74	Can change tipo evento	19	change_tipoevento
75	Can delete tipo evento	19	delete_tipoevento
76	Can view tipo evento	19	view_tipoevento
77	Can add tipo cuota	20	add_tipocuota
78	Can change tipo cuota	20	change_tipocuota
79	Can delete tipo cuota	20	delete_tipocuota
80	Can view tipo cuota	20	view_tipocuota
81	Can add tipo cotizacion	21	add_tipocotizacion
82	Can change tipo cotizacion	21	change_tipocotizacion
83	Can delete tipo cotizacion	21	delete_tipocotizacion
84	Can view tipo cotizacion	21	view_tipocotizacion
85	Can add proyecto tipo producto	22	add_proyectotipoproducto
86	Can change proyecto tipo producto	22	change_proyectotipoproducto
87	Can delete proyecto tipo producto	22	delete_proyectotipoproducto
88	Can view proyecto tipo producto	22	view_proyectotipoproducto
89	Can add producto	23	add_producto
90	Can change producto	23	change_producto
91	Can delete producto	23	delete_producto
92	Can view producto	23	view_producto
93	Can add precio	24	add_precio
94	Can change precio	24	change_precio
95	Can delete precio	24	delete_precio
96	Can view precio	24	view_precio
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
109	Can add desasignacion lead asesor	28	add_desasignacionleadasesor
110	Can change desasignacion lead asesor	28	change_desasignacionleadasesor
111	Can delete desasignacion lead asesor	28	delete_desasignacionleadasesor
112	Can view desasignacion lead asesor	28	view_desasignacionleadasesor
113	Can add cuota	29	add_cuota
114	Can change cuota	29	change_cuota
115	Can delete cuota	29	delete_cuota
116	Can view cuota	29	view_cuota
117	Can add video proyecto	30	add_videoproyecto
118	Can change video proyecto	30	change_videoproyecto
119	Can delete video proyecto	30	delete_videoproyecto
120	Can view video proyecto	30	view_videoproyecto
121	Can add video producto	31	add_videoproducto
122	Can change video producto	31	change_videoproducto
123	Can delete video producto	31	delete_videoproducto
124	Can view video producto	31	view_videoproducto
125	Can add imagen proyecto	32	add_imagenproyecto
126	Can change imagen proyecto	32	change_imagenproyecto
127	Can delete imagen proyecto	32	delete_imagenproyecto
128	Can view imagen proyecto	32	view_imagenproyecto
129	Can add imagen producto	33	add_imagenproducto
130	Can change imagen producto	33	change_imagenproducto
131	Can delete imagen producto	33	delete_imagenproducto
132	Can view imagen producto	33	view_imagenproducto
133	Can add blacklisted token	34	add_blacklistedtoken
134	Can change blacklisted token	34	change_blacklistedtoken
135	Can delete blacklisted token	34	delete_blacklistedtoken
136	Can view blacklisted token	34	view_blacklistedtoken
137	Can add outstanding token	35	add_outstandingtoken
138	Can change outstanding token	35	change_outstandingtoken
139	Can delete outstanding token	35	delete_outstandingtoken
140	Can view outstanding token	35	view_outstandingtoken
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
52	3	33
53	3	34
54	3	35
55	3	36
60	2	57
61	2	58
62	2	59
63	2	60
64	1	105
65	1	106
66	1	107
67	1	108
68	3	89
69	3	90
70	3	91
71	3	92
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
1	Gestión de proyectos	proyecto	9	A
4	Gestión de productos	producto	23	A
\.


--
-- Data for Name: cuenta_user; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.cuenta_user (id, password, last_login, is_superuser, username, first_name, last_name, email, is_staff, is_active, date_joined, "codigoAsesor", "isAdmin", estado_id) FROM stdin;
3	pbkdf2_sha256$600000$klVf2T6ADjhRpycBvEt8mp$AqHTHE0zXd/LS2/HgIt5bp7hsUGFWm0qJuRp7xPbz9A=	\N	f	jesus	Jesus	begazo	jbegazoti@unsa.edu.pe	t	t	2024-01-05 14:56:34.558953-05	\N	f	\N
6	pbkdf2_sha256$600000$2HH7y5sjG3wcF33dPaS8nd$pU+VxzzAO0L6TzU/3uoduphmvMbpHI5dOZ9LcoBtOyA=	\N	f	diegoportillo	Diego Moises	Chuctaya Ruiz	diego@unsa.edu.pe	f	t	2024-01-10 01:52:32.216899-05	\N	t	A
1	pbkdf2_sha256$600000$BMJ8LF8DGDtK75g1jlAJbH$pvS/k25Y+f0BUQQBOycCYkIImuQJm/vZkxb3UI3Qpzg=	2024-02-02 02:42:11.297841-05	t	andrew	Andrew	Jacobo Castillo	ajacoboc@unsa.edu.pe	t	t	2023-12-29 14:19:22-05	\N	t	A
4	pbkdf2_sha256$600000$BMJ8LF8DGDtK75g1jlAJbH$pvS/k25Y+f0BUQQBOycCYkIImuQJm/vZkxb3UI3Qpzg=	\N	f	ingcocoliso	Cocoliso Javier	Luna Mendoza	ingecocoliso@gmail.com	f	t	2024-01-08 03:15:13-05	asesor_a	t	A
\.


--
-- Data for Name: cuenta_user_groups; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.cuenta_user_groups (id, user_id, group_id) FROM stdin;
10	3	3
26	1	4
28	6	2
38	4	1
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
135	2024-01-28 19:28:45.878664-05	4	Gestión de productos	2	[{"changed": {"fields": ["ContentType"]}}]	7	1
136	2024-01-28 19:30:59.096043-05	9	julian	3		8	1
137	2024-01-28 19:30:59.099487-05	8	Testing123	3		8	1
138	2024-01-28 19:30:59.101555-05	5	Frego	3		8	1
139	2024-01-28 19:30:59.103565-05	2	qwerty	3		8	1
140	2024-01-28 19:33:02.432255-05	4	ingcocoliso	2	[{"changed": {"fields": ["Password"]}}]	8	1
141	2024-02-02 02:42:26.750172-05	3	administrador	2	[{"changed": {"fields": ["Name"]}}]	3	1
142	2024-02-02 18:33:25.315031-05	3	Visita oficina	1	[{"added": {}}]	19	1
143	2024-02-02 18:33:31.756361-05	4	Visita campo	1	[{"added": {}}]	19	1
\.


--
-- Data for Name: django_migrations; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.django_migrations (id, app, name, applied) FROM stdin;
1	contenttypes	0001_initial	2024-01-28 19:28:02.029686-05
2	contenttypes	0002_remove_content_type_name	2024-01-28 19:28:02.039213-05
3	auth	0001_initial	2024-01-28 19:28:02.106816-05
4	auth	0002_alter_permission_name_max_length	2024-01-28 19:28:02.113243-05
5	auth	0003_alter_user_email_max_length	2024-01-28 19:28:02.119907-05
6	auth	0004_alter_user_username_opts	2024-01-28 19:28:02.125399-05
7	auth	0005_alter_user_last_login_null	2024-01-28 19:28:02.131592-05
8	auth	0006_require_contenttypes_0002	2024-01-28 19:28:02.134994-05
9	auth	0007_alter_validators_add_error_messages	2024-01-28 19:28:02.142685-05
10	auth	0008_alter_user_username_max_length	2024-01-28 19:28:02.150256-05
11	auth	0009_alter_user_last_name_max_length	2024-01-28 19:28:02.15856-05
12	auth	0010_alter_group_name_max_length	2024-01-28 19:28:02.16911-05
13	auth	0011_update_proxy_permissions	2024-01-28 19:28:02.175663-05
14	auth	0012_alter_user_first_name_max_length	2024-01-28 19:28:02.181662-05
15	cuenta	0001_initial	2024-01-28 19:28:02.290049-05
16	admin	0001_initial	2024-01-28 19:28:02.319048-05
17	admin	0002_logentry_remove_auto_add	2024-01-28 19:28:02.326617-05
18	admin	0003_logentry_add_action_flag_choices	2024-01-28 19:28:02.336152-05
19	marketing	0001_initial	2024-01-28 19:28:02.439172-05
20	ventas	0001_initial	2024-01-28 19:28:03.090702-05
21	multimedia	0001_initial	2024-01-28 19:28:03.197348-05
22	sessions	0001_initial	2024-01-28 19:28:03.21488-05
23	token_blacklist	0001_initial	2024-01-28 19:28:03.276911-05
24	token_blacklist	0002_outstandingtoken_jti_hex	2024-01-28 19:28:03.291729-05
25	token_blacklist	0003_auto_20171017_2007	2024-01-28 19:28:03.314046-05
26	token_blacklist	0004_auto_20171017_2013	2024-01-28 19:28:03.335387-05
27	token_blacklist	0005_remove_outstandingtoken_jti	2024-01-28 19:28:03.350125-05
28	token_blacklist	0006_auto_20171017_2113	2024-01-28 19:28:03.368185-05
29	token_blacklist	0007_auto_20171017_2214	2024-01-28 19:28:03.47242-05
30	token_blacklist	0008_migrate_to_bigautofield	2024-01-28 19:28:03.543345-05
31	token_blacklist	0010_fix_migrate_to_bigautofield	2024-01-28 19:28:03.575924-05
32	token_blacklist	0011_linearizes_history	2024-01-28 19:28:03.579206-05
33	token_blacklist	0012_alter_outstandingtoken_user	2024-01-28 19:28:03.599862-05
56	ventas	0002_lead_fecha_asignacion_lead_fecha_desasignacion_and_more	2024-01-29 21:55:29.818786-05
57	ventas	0003_alter_desasignacionleadasesor_fecha_and_more	2024-01-31 02:20:21.244183-05
\.


--
-- Data for Name: django_session; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.django_session (session_key, session_data, expire_date) FROM stdin;
venlcd4mrtw4xx6bfmwqshwjmwbnt8w4	.eJxVjDsOwjAQBe_iGln-JV5T0nOGaL27IQFkS3FSIe4OkVJA-2bmvdSA2zoNW5NlmFmdlVWn3y0jPaTsgO9YblVTLesyZ70r-qBNXyvL83K4fwcTtulbZ0tiEjFEL9GnPmGMPdDIjjN00UGGFIC8dzaK4wA9BkMmWOjGUQyr9wfdYjeP:1rLoO3:LBbHkRdwwW8Ru7nIa6hjsYCFCG-piMilSJ5ewqEQIYA	2024-01-19 12:53:39.63397-05
ic83asz0faoq6oa9p1lv9xlbltm9mrrw	.eJxVjDsOwjAQBe_iGln-JV5T0nOGaL27IQFkS3FSIe4OkVJA-2bmvdSA2zoNW5NlmFmdlVWn3y0jPaTsgO9YblVTLesyZ70r-qBNXyvL83K4fwcTtulbZ0tiEjFEL9GnPmGMPdDIjjN00UGGFIC8dzaK4wA9BkMmWOjGUQyr9wfdYjeP:1rM6Fg:0Luj5J_Q2_qDZciCr9ENxgAC6SMZ0d5HD3HvTIufz_M	2024-01-20 07:58:12.43285-05
a10ed6r80f03b511burqx3bxkyyp3irh	.eJxVjDsOwjAQBe_iGlnxP6ak5wzWZneNA8iW4qRC3B0ipYD2zcx7iQTbWtLWeUkzibPQ4vS7TYAPrjugO9Rbk9jqusyT3BV50C6vjfh5Ody_gwK9fOuoRg5ORySyYHVgT07lTMpkcsgUCA2GaCDoPGD2HDWOExkbwQcasnh_AP9sONw:1rSrDz:iPyd-GBIBkofC0ZzzHoHPIBL5UHGjfr7mY5026ouaxs	2024-02-07 23:20:23.363206-05
ustw2rx0r6wglgc7hrumf0vu28hq8hxk	.eJxVjDsOwjAQBe_iGln-JV5T0nOGaL27IQFkS3FSIe4OkVJA-2bmvdSA2zoNW5NlmFmdlVWn3y0jPaTsgO9YblVTLesyZ70r-qBNXyvL83K4fwcTtulbZ0tiEjFEL9GnPmGMPdDIjjN00UGGFIC8dzaK4wA9BkMmWOjGUQyr9wfdYjeP:1rUFVd:PfGX9JDHlH5IcGWeSUDK6jCEb1T04I74iiG0zlMcd20	2024-02-11 19:28:21.418627-05
ef3idled12gn237wpjrqm4ezd6gpylyy	.eJxVjDsOwjAQBe_iGln-JV5T0nOGaL27IQFkS3FSIe4OkVJA-2bmvdSA2zoNW5NlmFmdlVWn3y0jPaTsgO9YblVTLesyZ70r-qBNXyvL83K4fwcTtulbZ0tiEjFEL9GnPmGMPdDIjjN00UGGFIC8dzaK4wA9BkMmWOjGUQyr9wfdYjeP:1rVoBf:ixAUh38vH0yftELJYwgomTv_frz3sNx0kqmaPgUKUwk	2024-02-16 02:42:11.304579-05
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
2	Alamos	Alamos	Descripción de Alamos	2024-01-10	2023-12-29 18:26:29-05	A	3	3
1	Socabaya	socabaya	Descripción de Socabaya	2024-01-10	2023-12-29 15:52:53-05	A	3	3
\.


--
-- Data for Name: marketing_campania; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.marketing_campania (id, nombre, codigo, fecha_creacion, fecha_estimada, fecha_cierre, coste_estimado, coste_real, descripcion, fecha_actualizacion, categoria_id, estado_id, proyecto_id, "usuarioActualizador_id", "usuarioCreador_id") FROM stdin;
4	Campaña fisica Alamos	campañafisicaalamos_fisico_1_4	2024-01-10 03:51:57.485892-05	2024-01-10	2024-01-31	1401.45	1889.45	Campaña física para el proyecto Alamos	\N	2	A	2	\N	\N
1	Socabaya Faceook	facebook_socabaya	2024-01-14 00:33:02.791326-05	2023-12-29	2023-12-29	67.45	90.5	Esta campaña esta enfocada en la recolección de lead para el proyecto Socabaya por medio de la red social Facebook	2024-01-14 00:33:02-05	1	A	1	3	1
3	Socabaya fisico	fisico_socabaya	2023-12-29 18:27:33.332633-05	2023-12-29	2023-12-29	0	0		2023-12-29 18:27:32-05	2	A	1	\N	\N
2	Alamos Facebook	facebook_alamos	2024-02-02 04:02:03.398928-05	2023-12-29	2023-12-29	1450	1450		2024-02-02 04:02:03-05	1	A	2	3	\N
\.


--
-- Data for Name: ventas_tipoproducto; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.ventas_tipoproducto (id, nombre, estado_id) FROM stdin;
1	Departamento	A
\.


--
-- Data for Name: ventas_producto; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.ventas_producto (id, nombre, codigo, numero, area, fecha_creacion, fecha_actualizacion, estado_id, proyecto_id, tipo_id, "usuarioActualizador_id", "usuarioCreador_id") FROM stdin;
1	Departamento socabaya	001	2	4	2024-01-02 19:00:00-05	2024-01-03 10:50:57-05	A	1	1	\N	\N
\.


--
-- Data for Name: multimedia_imagenproducto; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.multimedia_imagenproducto (id, imagen, producto_id) FROM stdin;
2	static/imagenes/468739_1.jpg	1
1	media/imagenes/104119.png	1
\.


--
-- Data for Name: multimedia_imagenproyecto; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.multimedia_imagenproyecto (id, imagen, proyecto_id) FROM stdin;
1	static/imagenes/schtgJ.jpg	2
\.


--
-- Data for Name: multimedia_videoproducto; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.multimedia_videoproducto (id, video, producto_id) FROM stdin;
\.


--
-- Data for Name: multimedia_videoproyecto; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.multimedia_videoproyecto (id, video, proyecto_id) FROM stdin;
\.


--
-- Data for Name: token_blacklist_outstandingtoken; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.token_blacklist_outstandingtoken (id, token, created_at, expires_at, user_id, jti) FROM stdin;
3	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcwMzk4MTk5OSwiaWF0IjoxNzAzODk1NTk5LCJqdGkiOiI3NWUxMTRhYTFmN2U0MDlhYWQ1MDQ2MzRlNGRlY2YxMyIsInVzZXJfaWQiOjF9.UkeomvXirVX7E2pbq6XKQJYx8yn-yH5UXb7ZkkC5aLg	2023-12-29 19:19:59.895272-05	2023-12-30 19:19:59-05	1	75e114aa1f7e409aad504634e4decf13
4	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcwMzk4MjE4OCwiaWF0IjoxNzAzODk1Nzg4LCJqdGkiOiI5NDg1ZmNhY2JiYWM0YzQ2YjVhNDg1ZDRjNDUzYjIwNyIsInVzZXJfaWQiOjF9.a4q_txmIWnNEhhCkmY6cqmJ9m2b0TZjaNE9kZq3vxBs	2023-12-29 19:23:08.254996-05	2023-12-30 19:23:08-05	1	9485fcacbbac4c46b5a485d4c453b207
24	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcwMzk5MTQzOSwiaWF0IjoxNzAzOTA1MDM5LCJqdGkiOiIzYTM1YjY3YzY5YmE0YWUyYmZmYWNjOGE0ZGY1ZWQwZSIsInVzZXJfaWQiOjF9.BKtf3h5RWzHpqcXemOLmOuJvYIQKqIPfZJVq5nnTZU8	2023-12-29 21:57:19.722576-05	2023-12-30 21:57:19-05	1	3a35b67c69ba4ae2bffacc8a4df5ed0e
29	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcwNDAzNzM5NywiaWF0IjoxNzAzOTUwOTk3LCJqdGkiOiJhNmI2MzViNjUxOTk0M2IwYTI3YWFmMWRlMTEyMzQwZCIsInVzZXJfaWQiOjF9.WVowvKwlwrshmM8GHD7AY-ZtEMYJzw2YUlRgiRkJU0g	2023-12-30 10:43:17.94572-05	2023-12-31 10:43:17-05	1	a6b635b6519943b0a27aaf1de112340d
43	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcwNDU2OTY3OCwiaWF0IjoxNzA0NDgzMjc4LCJqdGkiOiI0ZDEyMTYyMmQxMjM0YmEwOWFlMDA3ODY3ZDJkMTE0ZSIsInVzZXJfaWQiOjF9.iD5gd4E4JmyjkgscDfVh5YPfUf7v4ReEA6BEO4zpNOQ	2024-01-05 14:34:38.313212-05	2024-01-06 14:34:38-05	1	4d121622d1234ba09ae007867d2d114e
47	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcwNDU3MDU5MiwiaWF0IjoxNzA0NDg0MTkyLCJqdGkiOiIyZGRiOGQwMjAyYmQ0Nzk5OGZjOGM2MzZkMjQ3NzI4ZiIsInVzZXJfaWQiOjF9.UAC76cvFLlg4LSoB3_BwTjmWXa3Cujf19XyT2ugxawA	2024-01-05 14:49:52.021941-05	2024-01-06 14:49:52-05	1	2ddb8d0202bd47998fc8c636d247728f
49	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcwNDU3MTAwOCwiaWF0IjoxNzA0NDg0NjA4LCJqdGkiOiJlODM1NzdhMmQxOTU0MGI1YTJhMTE2YzJmYWE2YTgxZiIsInVzZXJfaWQiOjN9.qNSlzx28r8W9y5ARHQPrhUlNofcbRAKB8s0G8Jm3L5E	2024-01-05 14:56:48.649486-05	2024-01-06 14:56:48-05	3	e83577a2d19540b5a2a116c2faa6a81f
53	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcwNDc4MDI3NSwiaWF0IjoxNzA0NjkzODc1LCJqdGkiOiI1OTgxNmIzZDYyN2Y0OWI5ODJiOTU5ZGZhYjkyYzU4NCIsInVzZXJfaWQiOjF9.dqJLg7POT0wiX5ZaGVXz7xdhQTAmyz0JTm5o4_mdRTY	2024-01-08 01:04:35.331619-05	2024-01-09 01:04:35-05	1	59816b3d627f49b982b959dfab92c584
54	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcwNDc4MDMwMCwiaWF0IjoxNzA0NjkzOTAwLCJqdGkiOiJkNjUyYjg4OWZhNTY0YTE2YjBhMjA5NGM0NGI5ZDcyOCIsInVzZXJfaWQiOjN9.fzPzz_rSizEZuyw9uKSc1tRHNuldNTPFclps998AmBQ	2024-01-08 01:05:00.419956-05	2024-01-09 01:05:00-05	3	d652b889fa564a16b0a2094c44b9d728
55	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcwNDc4NTMzNywiaWF0IjoxNzA0Njk4OTM3LCJqdGkiOiI2YTU0NzdiN2VmNDM0ZjI3YjNjODE0NjhjYjRlOWIzYyIsInVzZXJfaWQiOjN9.zQ-JesrG5XLmqEwJg5OI2ewi0dY9W-5E0djF1O6GspU	2024-01-08 02:28:57.886581-05	2024-01-09 02:28:57-05	3	6a5477b7ef434f27b3c81468cb4e9b3c
56	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcwNDc4NTk4OCwiaWF0IjoxNzA0Njk5NTg4LCJqdGkiOiI2NDM0NjFmYmQ2ZTk0OTJmODY0MWY5NjVhNGVkMzA5NiIsInVzZXJfaWQiOjN9.Z9hpPhIER7IKpCy-PwLMzkze7UsmFvfhYm6mpyCgXo8	2024-01-08 02:39:48.667729-05	2024-01-09 02:39:48-05	3	643461fbd6e9492f8641f965a4ed3096
57	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcwNDc4OTEyNywiaWF0IjoxNzA0NzAyNzI3LCJqdGkiOiJkMGExOTZhYzY2MDQ0NjIwOTQxOGMxMTM5NTNmZTE3MCIsInVzZXJfaWQiOjN9.Fq3NcSqgTeNaURBFAgHD_EYTZFbZfXfPbJysOCzDWmo	2024-01-08 03:32:07.398892-05	2024-01-09 03:32:07-05	3	d0a196ac660446209418c113953fe170
58	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcwNDc5MjgyOSwiaWF0IjoxNzA0NzA2NDI5LCJqdGkiOiJlMjAyYTM3NmU4MTk0OTViYjQ3YTAyNjkyMWYyODRmZCIsInVzZXJfaWQiOjN9.SJav82RZIIwMyRGkpRa11WcalleJOVjVfj7NLjekVc4	2024-01-08 04:33:49.704569-05	2024-01-09 04:33:49-05	3	e202a376e819495bb47a026921f284fd
59	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcwNDc5MzI2NywiaWF0IjoxNzA0NzA2ODY3LCJqdGkiOiIwYWM5MjQyMjcyMDA0ZDExODBiOTk1MjQ5ZTA4Yzc0OCIsInVzZXJfaWQiOjN9.h8y-dj28zVAL8hMnh0qlFm3F9M02K39BYCNqlr0OFvk	2024-01-08 04:41:07.972165-05	2024-01-09 04:41:07-05	3	0ac9242272004d1180b995249e08c748
61	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcwNDc5MzQzNywiaWF0IjoxNzA0NzA3MDM3LCJqdGkiOiJlNTE1MWQyYzRjYzA0MjM2ODYyYjkyMTFhYzQ5ZDg4YiIsInVzZXJfaWQiOjN9.pRoBFWiIyXNa_wDDLOhSOb9jWYewAN3aTTLOHxCSxzQ	2024-01-08 04:43:57.227997-05	2024-01-09 04:43:57-05	3	e5151d2c4cc04236862b9211ac49d88b
62	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcwNDc5MzQ0OCwiaWF0IjoxNzA0NzA3MDQ4LCJqdGkiOiJmZjdmODQ5YjFiOWI0NTY4OTNhNTk5MzQzMWUyNGMxYyIsInVzZXJfaWQiOjN9.BbTuYjIdPFGRnwlBfGm1_arZ3Usba10VFPq-xynchl4	2024-01-08 04:44:08.683591-05	2024-01-09 04:44:08-05	3	ff7f849b1b9b456893a5993431e24c1c
63	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcwNDc5Mzg1MSwiaWF0IjoxNzA0NzA3NDUxLCJqdGkiOiI4Y2U3NDllN2RhYmE0NTQ4OGEzZWRiMTI5ZTcwM2JjNiIsInVzZXJfaWQiOjN9.fcY_0yI9sgye1O6P8HsTHEwPc_Gvctcpi26hT4l43jY	2024-01-08 04:50:51.823593-05	2024-01-09 04:50:51-05	3	8ce749e7daba45488a3edb129e703bc6
64	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcwNDc5NDIwMywiaWF0IjoxNzA0NzA3ODAzLCJqdGkiOiJjYzA3ZWFhNWQzMzc0ZDE3YTgwZDRjNzY3ZGE3MjRiNiIsInVzZXJfaWQiOjN9.IrWRRAgdRMd0Kd7Gw0HDVVNAdaBipvjWCtm8Ychs5Ew	2024-01-08 04:56:43.739793-05	2024-01-09 04:56:43-05	3	cc07eaa5d3374d17a80d4c767da724b6
65	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcwNDc5NTE4OCwiaWF0IjoxNzA0NzA4Nzg4LCJqdGkiOiI4NzBmYjhkMzQ5ZTg0NGE4OWYyZTJjOWE2ZTBlZjk4OCIsInVzZXJfaWQiOjN9.DCfQQF3X2cuQ1e3Bml8YvQfAoQFoOdqlrvuRw97_6Vc	2024-01-08 05:13:08.036567-05	2024-01-09 05:13:08-05	3	870fb8d349e844a89f2e2c9a6e0ef988
66	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcwNDc5NTU2NiwiaWF0IjoxNzA0NzA5MTY2LCJqdGkiOiIyNDdlNjNlNjhkZDU0MjUzODhhMGE1NDE4MjEyN2NiNCIsInVzZXJfaWQiOjN9.NZt8EwNdxlf6W9MLJojzcqWABoQCc4jT4W07dBrZeFI	2024-01-08 05:19:26.598989-05	2024-01-09 05:19:26-05	3	247e63e68dd5425388a0a54182127cb4
67	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcwNDc5NTYyOCwiaWF0IjoxNzA0NzA5MjI4LCJqdGkiOiIxM2Q1M2IxOWEyNjU0ZjY1YWQyYTc2ZmZjNGFjN2YzNiIsInVzZXJfaWQiOjN9.1m-SUrkVvNZfYhYxPgEEK0GX6vo0evHyBlWJRmgk2i8	2024-01-08 05:20:28.779812-05	2024-01-09 05:20:28-05	3	13d53b19a2654f65ad2a76ffc4ac7f36
68	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcwNDk0MjM5OCwiaWF0IjoxNzA0ODU1OTk4LCJqdGkiOiJlYmQyZDAwYzg4OTA0MDAxYWRhZTc5OTllOWVmZmJlOCIsInVzZXJfaWQiOjN9.VS7AZC98Bx_YjUGk0Wy_2PfjCwtkeeNKreBjCAhSnJs	2024-01-09 22:06:38.886484-05	2024-01-10 22:06:38-05	3	ebd2d00c88904001adae7999e9effbe8
69	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcwNDk0MjkxMCwiaWF0IjoxNzA0ODU2NTEwLCJqdGkiOiJhYWUwMTUxNzVlNDI0NzMyYjY3MmI5YmU3OTVhNTE2ZSIsInVzZXJfaWQiOjF9.IDoULnDUk6yFpszwBcuPsqmBgCwoqeSXp-PyB0ZWpow	2024-01-09 22:15:10.241074-05	2024-01-10 22:15:10-05	1	aae015175e424732b672b9be795a516e
70	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcwNDk0MjkxNiwiaWF0IjoxNzA0ODU2NTE2LCJqdGkiOiJiOTk0Y2JiMTU2NzU0ZTA0ODFjYmIyODhkY2QzZDZhMSIsInVzZXJfaWQiOjN9.6kGl4tvRAY3g-N7WV4yRA8XgYtLS_H8xBosAaY_XDP4	2024-01-09 22:15:16.711217-05	2024-01-10 22:15:16-05	3	b994cbb156754e0481cbb288dcd3d6a1
71	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcwNDk0MzM4MywiaWF0IjoxNzA0ODU2OTgzLCJqdGkiOiI3NmE5NzA1MTM4YzU0MzQ1YTRhMDk3N2JlODI5YTI3NiIsInVzZXJfaWQiOjN9.QUAYsgHNC1YJXSFuC-swEkZ-1jGe81gb3O927CIXZ8o	2024-01-09 22:23:03.101361-05	2024-01-10 22:23:03-05	3	76a9705138c54345a4a0977be829a276
72	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcwNDg3NTM4MCwiaWF0IjoxNzA0ODYwOTgwLCJqdGkiOiI4YzUzNTNkZDRjZjA0Yzc4YTRiNmI2ZjMyNDk2ZGU5NCIsInVzZXJfaWQiOjN9.kwnxgCH2X_Q4XOrbX5tS9apwAh_oLkkbfBBLq7OrtzU	2024-01-09 23:29:40.272939-05	2024-01-10 03:29:40-05	3	8c5353dd4cf04c78a4b6b6f32496de94
73	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcwNDg3NjcxNywiaWF0IjoxNzA0ODYyMzE3LCJqdGkiOiI5NzY3NmJjZTgxODY0YTY2YTJjZWEwZTRiMDhjNDMwYiIsInVzZXJfaWQiOjN9.4NzwPD4P56nYtJ3w9rCaBkNxJ3ZZ6PPbLkGXnFLFY5E	2024-01-09 23:51:57.774034-05	2024-01-10 03:51:57-05	3	97676bce81864a66a2cea0e4b08c430b
74	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcwNDg3ODQ0MSwiaWF0IjoxNzA0ODY0MDQxLCJqdGkiOiJmMWNhOTI3N2VmOTc0YmQ2OTZmODM5ZTllMjk3OWU2MyIsInVzZXJfaWQiOjN9.M_Os4QF5wW1wRV47DbPS5xr7dtern3vaKwMN9NAkRWc	2024-01-10 00:20:41.585516-05	2024-01-10 04:20:41-05	3	f1ca9277ef974bd696f839e9e2979e63
75	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcwNDg3ODQ4NiwiaWF0IjoxNzA0ODY0MDg2LCJqdGkiOiIwNTA1NzY0MTg4MmI0YmUzOTgyODJmZmViNGQ4NWRhYiIsInVzZXJfaWQiOjN9.kGg1FLkDizM78PBbqsx27EtUmas8fLOBN1XcIiqnrSQ	2024-01-10 00:21:26.422383-05	2024-01-10 04:21:26-05	3	05057641882b4be398282ffeb4d85dab
76	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcwNDg3OTQ3OSwiaWF0IjoxNzA0ODY1MDc5LCJqdGkiOiI4OGU4MDBkZjRmZjA0ODY5YjM0ZmFiMWY2MWQ0YWQyMyIsInVzZXJfaWQiOjN9.N6BmNg6kPRKLJ-azAB6NNCIsYNMpOeAF48K1Wf6MDdw	2024-01-10 00:37:59.772553-05	2024-01-10 04:37:59-05	3	88e800df4ff04869b34fab1f61d4ad23
77	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcwNDg3OTUwMywiaWF0IjoxNzA0ODY1MTAzLCJqdGkiOiJiM2EwYTk2OTA5YmI0ZDNmOWI0NzNmMzE0NjhlYzRiMSIsInVzZXJfaWQiOjN9.KPTgVVmE15wQT2IY5QL4i4tso080euGHc814SVqVUDE	2024-01-10 00:38:23.021601-05	2024-01-10 04:38:23-05	3	b3a0a96909bb4d3f9b473f31468ec4b1
78	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcwNDg4NTcxNywiaWF0IjoxNzA0ODcxMzE3LCJqdGkiOiIzOGEzMWU5NmQxYzc0ZTNhODEyZGUwMGY2ZjA3YmExMSIsInVzZXJfaWQiOjN9.pNh3gZhtm5x2tl2AXleCf-aTTnrHJrFLvHi5hxRn1K8	2024-01-10 02:21:57.596397-05	2024-01-10 06:21:57-05	3	38a31e96d1c74e3a812de00f6f07ba11
79	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcwNDg4NjQzNiwiaWF0IjoxNzA0ODcyMDM2LCJqdGkiOiIxZjY5YWE5ZWVkMTc0Yzc3OWM5MjdhOGU3ZDNhOTI4NyIsInVzZXJfaWQiOjN9.gAi6wc_VGMZuWsw-ELN6ePVSRL2725Gfk0F1hnErH1s	2024-01-10 02:33:56.979788-05	2024-01-10 06:33:56-05	3	1f69aa9eed174c779c927a8e7d3a9287
80	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcwNDg4NjQ1MSwiaWF0IjoxNzA0ODcyMDUxLCJqdGkiOiJlNWEyMDFmYTJmN2Q0MWNkYmM2MWFlMWE3Y2QzNzY5NiIsInVzZXJfaWQiOjN9.1VjJzR8ckC_hF4GZmC1R9juxbfQ2GagpOp_ZVeooMSg	2024-01-10 02:34:11.076736-05	2024-01-10 06:34:11-05	3	e5a201fa2f7d41cdbc61ae1a7cd37696
81	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcwNDg4NjQ3NiwiaWF0IjoxNzA0ODcyMDc2LCJqdGkiOiJiZGYwZjI2ZmMwMjM0YjZjYjNkMmIxZTEzNzNkZWFiYiIsInVzZXJfaWQiOjN9.C69sTdLEKriBFZ1yOsFY3rqqf5tcPNznvZJ0XXkHkQg	2024-01-10 02:34:36.413031-05	2024-01-10 06:34:36-05	3	bdf0f26fc0234b6cb3d2b1e1373deabb
82	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcwNDg5MjMyMSwiaWF0IjoxNzA0ODc3OTIxLCJqdGkiOiIzNmU0NDhmNWZmOTI0ZmZiYWE4Nzg0NmVjM2Q5NmQzMSIsInVzZXJfaWQiOjF9.U960KyebdCYokl7zjaWi7Dkc3Fbpvdj4t4V8qDP7o8w	2024-01-10 04:12:01.370706-05	2024-01-10 08:12:01-05	1	36e448f5ff924ffbaa87846ec3d96d31
83	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcwNDkxMTA3OCwiaWF0IjoxNzA0ODk2Njc4LCJqdGkiOiJjZjE5NzVkMmYwNWU0MTZkYWUxMzY0MzI3YTc4ZjM5ZiIsInVzZXJfaWQiOjN9.cFH-kiI5mM8rk0IbqgHMW-qWJe6s0jac0bqPzyIYhsQ	2024-01-10 09:24:38.916619-05	2024-01-10 13:24:38-05	3	cf1975d2f05e416dae1364327a78f39f
84	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcwNDkyNDU0MSwiaWF0IjoxNzA0OTEwMTQxLCJqdGkiOiIzNjk0OWRhZDExMmI0OTE5YmQ3NWNhYjJhM2RmN2NkNSIsInVzZXJfaWQiOjN9.5fonyOwa8F8S0IGfyyerwSAZS7MTsP-O_t02NNBrPvk	2024-01-10 13:09:01.630008-05	2024-01-10 17:09:01-05	3	36949dad112b4919bd75cab2a3df7cd5
85	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcwNDkyNDc0MCwiaWF0IjoxNzA0OTEwMzQwLCJqdGkiOiIwNDI4MjQ1YTA3YjI0OWRlYjQ4Y2QxYTJjOWEyNzJmNCIsInVzZXJfaWQiOjN9.LmpGLvS_Mx6XTDIM3uF63Q0Tf-po9NPlfa3_lB58oPg	2024-01-10 13:12:20.966158-05	2024-01-10 17:12:20-05	3	0428245a07b249deb48cd1a2c9a272f4
86	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcwNDkyNTE4NCwiaWF0IjoxNzA0OTEwNzg0LCJqdGkiOiIxYjI5NDcyMzNmMjQ0Y2FhOTI1MzQ0YTIwYWM5MTVkMSIsInVzZXJfaWQiOjF9.zta0sw71e0zOU22p4kAejO6yrHtlaaqIZFNwI8pUg0s	2024-01-10 13:19:44.196386-05	2024-01-10 17:19:44-05	1	1b2947233f244caa925344a20ac915d1
87	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcwNDkyNTIxMywiaWF0IjoxNzA0OTEwODEzLCJqdGkiOiJiNzM2ZjU1M2I5NmU0NWE4Yjc0ZWRmZmY4ZDk0YzE2OSIsInVzZXJfaWQiOjN9.bpljmzdjxST3sEaMvA4CFo2OzuMhU9DMlKWRGgmZb0w	2024-01-10 13:20:13.868062-05	2024-01-10 17:20:13-05	3	b736f553b96e45a8b74edfff8d94c169
88	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcwNDkyNTI0NSwiaWF0IjoxNzA0OTEwODQ1LCJqdGkiOiI3NzI5NjVlYzU2ZTA0ODcxOTdjZjc3ZDk3MDliZjllZCIsInVzZXJfaWQiOjF9.m5SYVUZYfHOlfJWtyF6Ms0cPR9QauLdK7VOz8Ypcb9o	2024-01-10 13:20:45.169257-05	2024-01-10 17:20:45-05	1	772965ec56e0487197cf77d9709bf9ed
89	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcwNDkyNTI3NCwiaWF0IjoxNzA0OTEwODc0LCJqdGkiOiJkMTY5MDcwMDdmYmI0YmRlOTBkY2NmNWQ2YmQ3MDNiNiIsInVzZXJfaWQiOjF9.UNR3Bmqa2WLFReuesROujkFwT_vK5rSRESQYZfdaO5I	2024-01-10 13:21:14.159574-05	2024-01-10 17:21:14-05	1	d16907007fbb4bde90dccf5d6bd703b6
90	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcwNDkyNTI4NSwiaWF0IjoxNzA0OTEwODg1LCJqdGkiOiIyODU2ZWJiOTJmMGM0YmI1YjkyNzVlZmUyYmE3YWE5ZSIsInVzZXJfaWQiOjN9.zKtCaPM3v1SIEeKzzKiU2YQfsTB18QthhcetNzMstfU	2024-01-10 13:21:25.056042-05	2024-01-10 17:21:25-05	3	2856ebb92f0c4bb5b9275efe2ba7aa9e
91	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcwNDkyNTMxMSwiaWF0IjoxNzA0OTEwOTExLCJqdGkiOiI3NmY5YWFhMWMzNjc0ZjhjYTYxMWEzOWE1YTc0NzlhMyIsInVzZXJfaWQiOjZ9.miLB6_pCxqTbMo4ADVDMYLeolE3OE-WNh4nWrOads0M	2024-01-10 13:21:51.282292-05	2024-01-10 17:21:51-05	6	76f9aaa1c3674f8ca611a39a5a7479a3
92	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcwNDkyNTMyMywiaWF0IjoxNzA0OTEwOTIzLCJqdGkiOiI3N2QwZmY2Njc5ZGY0ODUwYmY1MTI0ZDcxNTkzMjliZCIsInVzZXJfaWQiOjN9.JWyldyjd7cDmCcufgDMiTYgycmFCOkgHGtEEU6rNilQ	2024-01-10 13:22:03.35155-05	2024-01-10 17:22:03-05	3	77d0ff6679df4850bf5124d7159329bd
93	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcwNDkyNTQ1NywiaWF0IjoxNzA0OTExMDU3LCJqdGkiOiIzNGVlNzA1MDZiZjY0ZDU2YmMxODk3ZmEyY2U3Mzk1ZiIsInVzZXJfaWQiOjZ9.kCGC3xc9GWrJIEwKHl8cUXgDmFNWY0n-TcUFZn3MY1E	2024-01-10 13:24:17.474713-05	2024-01-10 17:24:17-05	6	34ee70506bf64d56bc1897fa2ce7395f
94	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcwNDkyNTQ2OSwiaWF0IjoxNzA0OTExMDY5LCJqdGkiOiJlODM0NzdhYTY5OTk0ZmUzOGFkMjQ1NGI0YWJhYWUzMyIsInVzZXJfaWQiOjN9.BhSYUnoluhbTzwRmdjxardlIqlkugvy-GkXE6B5kVl8	2024-01-10 13:24:29.467785-05	2024-01-10 17:24:29-05	3	e83477aa69994fe38ad2454b4abaae33
95	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcwNDkyNTQ5OSwiaWF0IjoxNzA0OTExMDk5LCJqdGkiOiI5OTVlN2M1MjM0ODA0ODRkOGE4YjVmMWJjN2RiMDA2ZiIsInVzZXJfaWQiOjN9.MY_07LY4G1zBoaEjKhE8om4DNVzSdi7vnsCd5NLigO8	2024-01-10 13:24:59.725789-05	2024-01-10 17:24:59-05	3	995e7c523480484d8a8b5f1bc7db006f
96	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcwNDkyNTUyOSwiaWF0IjoxNzA0OTExMTI5LCJqdGkiOiI3ZmU2YzZlZThmNzE0M2U0YTY5MjkyMzM5MDQwMGY2ZSIsInVzZXJfaWQiOjZ9.tzPauAgQxDvVgZmrTbnIr_8foI-LpuxZTC0vwwf_src	2024-01-10 13:25:29.209381-05	2024-01-10 17:25:29-05	6	7fe6c6ee8f7143e4a692923390400f6e
97	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcwNDkyNTU3NSwiaWF0IjoxNzA0OTExMTc1LCJqdGkiOiJiODA5YjU3M2VhZTk0NGU2OGUxMjBlNDBmNTAwZmFmYSIsInVzZXJfaWQiOjN9.0TNtEHC7xOW2yVpLCTmXgglbFP-9gu-07pXPa0LlgGA	2024-01-10 13:26:15.812411-05	2024-01-10 17:26:15-05	3	b809b573eae944e68e120e40f500fafa
98	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcwNTIyNDcyOSwiaWF0IjoxNzA1MjEwMzI5LCJqdGkiOiJjYmZiODZhM2VlNjc0M2UxOTI1MzMyODU0YTVjOTA1OSIsInVzZXJfaWQiOjN9.QfBKY2TNR-PgBdzKgOxa9aKadSpPjA_-ZlRv_6vf4R4	2024-01-14 00:32:09.27196-05	2024-01-14 04:32:09-05	3	cbfb86a3ee6743e1925332854a5c9059
99	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcwNTI2MjYxOSwiaWF0IjoxNzA1MjQ4MjE5LCJqdGkiOiI1MDcyMzAwYzg4NWE0ZGJmOTA2MTUzMTM2NjhmMTI1NyIsInVzZXJfaWQiOjN9.ozHNoAj8zveFC2GCATcrhnIg0ZtBbsWuqTTXVsjZtHY	2024-01-14 11:03:39.383788-05	2024-01-14 15:03:39-05	3	5072300c885a4dbf90615313668f1257
100	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcwNjE1Mjc5NCwiaWF0IjoxNzA2MTM4Mzk0LCJqdGkiOiIxMTAwNmEwZmZjMmM0MTlhODIyZmE5N2M1Zjc4NmI4OSIsInVzZXJfaWQiOjF9.zud0xwTqQlnLFgwKvlNKiNJECUtneAx1D6bDvKhKJgg	2024-01-24 18:19:54.960136-05	2024-01-24 22:19:54-05	1	11006a0ffc2c419a822fa97c5f786b89
102	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcwNjE3MDc3NCwiaWF0IjoxNzA2MTU2Mzc0LCJqdGkiOiI4MzI4ZGJhYjA5ZGQ0NzA1YjlmODczOWZiYzYyMGEzYSIsInVzZXJfaWQiOjF9.XnRHYBzq2g5LlacMcZZNZDHh2-Kw8tmqCwRNUDsqPC8	2024-01-24 23:19:34.030639-05	2024-01-25 03:19:34-05	1	8328dbab09dd4705b9f8739fbc620a3a
107	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcwNjUwMjU3NCwiaWF0IjoxNzA2NDg4MTc0LCJqdGkiOiIwNzA3YzVjNWI5OGY0NTk5OGE2MDlhMTIxNWNlMjc3OSIsInVzZXJfaWQiOjF9.eI3xNMvyJpfMyGMJG-98ti3t2ChP7EnhKzr7jcfi4nI	2024-01-28 19:29:34.87233-05	2024-01-28 23:29:34-05	1	0707c5c5b98f45998a609a1215ce2779
108	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcwNjUwMjU4NCwiaWF0IjoxNzA2NDg4MTg0LCJqdGkiOiJlNWMzNGJjNWE3YWU0MGNhYWUzZmY3MTYxYmIyNzI1NSIsInVzZXJfaWQiOjN9.pwXyXWOdM0RjctVEWGIKtJqxg7FSW5YnZM2RY35dMX4	2024-01-28 19:29:44.082605-05	2024-01-28 23:29:44-05	3	e5c34bc5a7ae40caae3ff7161bb27255
1	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcwMzk4MTg5MCwiaWF0IjoxNzAzODk1NDkwLCJqdGkiOiI5ODhhMGFhZWU1NjY0ODRmYTVjM2I4MTU3ZTQwZjI2MiIsInVzZXJfaWQiOjJ9.xUyI_xaYP4jITRoHz2koVLM0bpSgafgWy4W_XrVh56w	2023-12-29 19:18:10.57334-05	2023-12-30 19:18:10-05	\N	988a0aaee566484fa5c3b8157e40f262
2	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcwMzk4MTk2MiwiaWF0IjoxNzAzODk1NTYyLCJqdGkiOiI0YmRjZGY5YTIzYmQ0NzkwYTY1OWQyYjI4ZGU1ZWVmMiIsInVzZXJfaWQiOjJ9.1iarWs0zLdznVALsE27p3-Oti9YDP2zDQUh0JJU8c6k	2023-12-29 19:19:22.363578-05	2023-12-30 19:19:22-05	\N	4bdcdf9a23bd4790a659d2b28de5eef2
5	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcwMzk4MjE5OSwiaWF0IjoxNzAzODk1Nzk5LCJqdGkiOiJlMjg3MGU0ZTUyYTU0OWU4YTczODlhZTg4ZjZiMWUyNiIsInVzZXJfaWQiOjJ9.wiTHZLBRA9ewChd85fmh_EtXILUqikGIG6LFCUVDe4Q	2023-12-29 19:23:19.474386-05	2023-12-30 19:23:19-05	\N	e2870e4e52a549e8a7389ae88f6b1e26
6	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcwMzk4MjI4OCwiaWF0IjoxNzAzODk1ODg4LCJqdGkiOiI1ZWY3MDJhNDM0N2U0NWU2OWU5NTkxMzU2ZjJkZDdkZCIsInVzZXJfaWQiOjJ9.28PuEEgCwBK1YfTPPZI1wxakJokSKqTIiN8af6UXo8U	2023-12-29 19:24:48.488721-05	2023-12-30 19:24:48-05	\N	5ef702a4347e45e69e9591356f2dd7dd
7	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcwMzk4MjM3NywiaWF0IjoxNzAzODk1OTc3LCJqdGkiOiIzMTkzNDU5NzU2N2Y0ODY4YjgwYjk1OTUwM2M3YzNiYiIsInVzZXJfaWQiOjJ9.OELR3Oy2QHElDwTiiLsuOdiKIJBIlbCvIDavpsmXlzI	2023-12-29 19:26:17.358011-05	2023-12-30 19:26:17-05	\N	31934597567f4868b80b959503c7c3bb
8	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcwMzk4MjQ1OCwiaWF0IjoxNzAzODk2MDU4LCJqdGkiOiIwNDZlYjUxNjliYmI0M2E0YjBhNGFlY2YzN2ZkYTczMSIsInVzZXJfaWQiOjJ9.6GeTXgsGI-5U2renn5Ntp3XxbfkRXnR95DgEJ2iaZFc	2023-12-29 19:27:38.753126-05	2023-12-30 19:27:38-05	\N	046eb5169bbb43a4b0a4aecf37fda731
9	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcwMzk4MjUwNiwiaWF0IjoxNzAzODk2MTA2LCJqdGkiOiIyOThhOTM1OGI4NGE0MGM1YjQzOGUyMjhmYzg2ODZhZiIsInVzZXJfaWQiOjJ9.Eh15Mcj6_rwUGa3YFhaGqEdOiE8_vjlrlVieYB8Vkzc	2023-12-29 19:28:26.228049-05	2023-12-30 19:28:26-05	\N	298a9358b84a40c5b438e228fc8686af
10	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcwMzk4MzA1MSwiaWF0IjoxNzAzODk2NjUxLCJqdGkiOiJkNjI3YWQxYmFiMmQ0YzM2OTFjY2U2N2E4ZjAxYTllYSIsInVzZXJfaWQiOjJ9.i3cruINpJPpwe0TbH9aoEmGaKIUBOk769wNffK_eJJ8	2023-12-29 19:37:31.989769-05	2023-12-30 19:37:31-05	\N	d627ad1bab2d4c3691cce67a8f01a9ea
11	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcwMzk4NTYzNywiaWF0IjoxNzAzODk5MjM3LCJqdGkiOiI2NDI4MWFiMWU3OWY0NGU4OWUwMjE3YjdmOGQzMTA0ZiIsInVzZXJfaWQiOjJ9.wNZH7Z0JMOhmqrOCeeRFNvHTrgV6hFB1MDTaexpk7DE	2023-12-29 20:20:37.589203-05	2023-12-30 20:20:37-05	\N	64281ab1e79f44e89e0217b7f8d3104f
12	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcwMzk4NTk3OCwiaWF0IjoxNzAzODk5NTc4LCJqdGkiOiJhYTE3MDg3ZTM5NGU0ODhkODdjMDM1YzU1NjE0YmQ4MSIsInVzZXJfaWQiOjJ9.RZYi42uqsdcrwX3eBT0gYlg20oPHPYb7OQ8ak0_w1hE	2023-12-29 20:26:18.835774-05	2023-12-30 20:26:18-05	\N	aa17087e394e488d87c035c55614bd81
13	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcwMzk4NjU1NSwiaWF0IjoxNzAzOTAwMTU1LCJqdGkiOiIyOGIwZTJiN2M3NTk0YWYwOTc1Njg0NjE1MGE2Mzk5ZCIsInVzZXJfaWQiOjJ9.iN7VA0nyQkSrwudrqWmQJyC5aFEdQ_xTY7RJUx_z5Kw	2023-12-29 20:35:55.262673-05	2023-12-30 20:35:55-05	\N	28b0e2b7c7594af09756846150a6399d
14	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcwMzk4Njk1NiwiaWF0IjoxNzAzOTAwNTU2LCJqdGkiOiI1NGQwOWQ2YzJkZTA0NDk3YjAyMzcxZjU0OGMzOGRiMCIsInVzZXJfaWQiOjJ9.7G49a5HJNros5t_fM3vFLBH2MIi_hJNDBoJ_hKktJxU	2023-12-29 20:42:36.116374-05	2023-12-30 20:42:36-05	\N	54d09d6c2de04497b02371f548c38db0
15	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcwMzk4NzczOCwiaWF0IjoxNzAzOTAxMzM4LCJqdGkiOiJkYmZkZjhlYzZlNGY0MTBhYWJjNGUyODE0YTU5NGZlMSIsInVzZXJfaWQiOjJ9.d1u58qpFBheA0UW8REXLsvnWB7bADZtPlCY5p19lQYc	2023-12-29 20:55:38.442923-05	2023-12-30 20:55:38-05	\N	dbfdf8ec6e4f410aabc4e2814a594fe1
16	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcwMzk4ODExOCwiaWF0IjoxNzAzOTAxNzE4LCJqdGkiOiJlNTRhMmIyZWU1MTI0OGMyYTMxOGUyNjg0ZGQ2NDUxYSIsInVzZXJfaWQiOjJ9.QiMTRUEtrwVKsgG_rkGriJQOPyS2OHwEJ_sWHmoxGiM	2023-12-29 21:01:58.557973-05	2023-12-30 21:01:58-05	\N	e54a2b2ee51248c2a318e2684dd6451a
17	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcwMzk4ODUwOSwiaWF0IjoxNzAzOTAyMTA5LCJqdGkiOiI1Yjg0NTY3YjdkMjg0OGExYWVhZDM0MzFiY2Y5ZGI2ZCIsInVzZXJfaWQiOjJ9.dSRCNQxH82YFb-j5xkcWiIkW1fgmlN6mVmhv1Cmp2J4	2023-12-29 21:08:29.296369-05	2023-12-30 21:08:29-05	\N	5b84567b7d2848a1aead3431bcf9db6d
18	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcwMzk4ODkxMywiaWF0IjoxNzAzOTAyNTEzLCJqdGkiOiJmMWM4MDkxODc4ZTc0N2MxYjg1MDI1ZGE3M2VhY2E2YSIsInVzZXJfaWQiOjJ9.5iPd0RE6IGMn-SMwxQWe7sdoHKtZCL_eTpdNDg0XWzM	2023-12-29 21:15:13.987389-05	2023-12-30 21:15:13-05	\N	f1c8091878e747c1b85025da73eaca6a
19	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcwMzk5MDM4NSwiaWF0IjoxNzAzOTAzOTg1LCJqdGkiOiJlMmU0NDBmYjQ4MmM0NjkxYmVhMGY1NWM1YzVjMTQ0ZSIsInVzZXJfaWQiOjJ9.eSgd9vcN5bAKX3GBXxVETrZkXxnRIfLIb9PX1uNSJJI	2023-12-29 21:39:45.541346-05	2023-12-30 21:39:45-05	\N	e2e440fb482c4691bea0f55c5c5c144e
20	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcwMzk5MDc0NSwiaWF0IjoxNzAzOTA0MzQ1LCJqdGkiOiIxYzIyMzMzYmFkYTg0ZTI3YTY5ZGJhYjc3MGJlNmU5MyIsInVzZXJfaWQiOjJ9.veAQAQ6pkkV5Qpj26reol_4gDFJXzeYRUb56mcx95s0	2023-12-29 21:45:45.601494-05	2023-12-30 21:45:45-05	\N	1c22333bada84e27a69dbab770be6e93
21	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcwMzk5MDc3MSwiaWF0IjoxNzAzOTA0MzcxLCJqdGkiOiJiY2JhNTNkNzc3OTg0NDc0YWY5MGJmMDAyM2U5NzNkMCIsInVzZXJfaWQiOjJ9.UvuA1lOPPqYW9OCmE4S_BZgjS_jXifhiVBVBOrkGVQM	2023-12-29 21:46:11.823504-05	2023-12-30 21:46:11-05	\N	bcba53d777984474af90bf0023e973d0
22	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcwMzk5MDkyNSwiaWF0IjoxNzAzOTA0NTI1LCJqdGkiOiIzNjVhOWJiNzdlNTQ0ZThjYmIwNzQ0ZDZmMmZkY2RhNiIsInVzZXJfaWQiOjJ9.IDeBYLUMtn8m4d7wtZHv5242Fiz3tQscTr4ZYJ0BV7A	2023-12-29 21:48:45.651372-05	2023-12-30 21:48:45-05	\N	365a9bb77e544e8cbb0744d6f2fdcda6
23	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcwMzk5MTI0OCwiaWF0IjoxNzAzOTA0ODQ4LCJqdGkiOiJjOGZkY2ZiZjU5Y2Q0MDFlYjVlMjMzMjQ5ZWY2N2VmOSIsInVzZXJfaWQiOjJ9.hd9NJoAJN67aVLLDIFbf5BiVIxxa39PehiuCqN6LHuY	2023-12-29 21:54:08.729256-05	2023-12-30 21:54:08-05	\N	c8fdcfbf59cd401eb5e233249ef67ef9
25	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcwNDAzNTY0MSwiaWF0IjoxNzAzOTQ5MjQxLCJqdGkiOiI2YmUyY2Q1NWI2Y2I0ODdkYjI0OWRjZDVkZjViOTg4NCIsInVzZXJfaWQiOjJ9.77hW_03vpphrFvbO_T0Z4saPRE9yzQ4gY1U3cfJVIVM	2023-12-30 10:14:01.866483-05	2023-12-31 10:14:01-05	\N	6be2cd55b6cb487db249dcd5df5b9884
26	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcwNDAzNjAzMSwiaWF0IjoxNzAzOTQ5NjMxLCJqdGkiOiJlOTg5ZTJiODQ1YjA0MTE3OWNlNmRmNmJlYjA2OTRmNCIsInVzZXJfaWQiOjJ9.frs8bXdYsyLC4n9ylit0mfHut7cLmrehbTrDaroZcuY	2023-12-30 10:20:31.888402-05	2023-12-31 10:20:31-05	\N	e989e2b845b041179ce6df6beb0694f4
27	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcwNDAzNzIyNiwiaWF0IjoxNzAzOTUwODI2LCJqdGkiOiIyN2IzMWFhZGZkYWQ0Yjc3YjE4ZWI0ZTYwYmExMzY5YiIsInVzZXJfaWQiOjJ9.HQpWkSuaDCjdKqozZnY9IOEAjRXL16gOkHrIGefNRTM	2023-12-30 10:40:26.693639-05	2023-12-31 10:40:26-05	\N	27b31aadfdad4b77b18eb4e60ba1369b
28	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcwNDAzNzIyNiwiaWF0IjoxNzAzOTUwODI2LCJqdGkiOiJmMmEzMWI2M2Q3NjM0MmI4ODQxMTI4ZWU5YWM3N2UwOSIsInVzZXJfaWQiOjJ9.c242xA_vZwbuMArgEzfB-KXIskobEJlp2q7JhsG9tGw	2023-12-30 10:40:26.746166-05	2023-12-31 10:40:26-05	\N	f2a31b63d76342b8841128ee9ac77e09
30	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcwNDAzNzU3NCwiaWF0IjoxNzAzOTUxMTc0LCJqdGkiOiJhZGYzYTc4NDU5ZDY0NjJkYjA1MDZlMWI4MTI2MTk5ZiIsInVzZXJfaWQiOjJ9.AQGqUH9eS7c3Oc7fNSWjtbPOaDNZ8kRZObwAoOYoF0c	2023-12-30 10:46:14.060316-05	2023-12-31 10:46:14-05	\N	adf3a78459d6462db0506e1b8126199f
31	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcwNDAzODMzOSwiaWF0IjoxNzAzOTUxOTM5LCJqdGkiOiI3NzdmNzYxYmI5ODE0ZGZiYjQzZGFiMTZmNGQzOTJjOCIsInVzZXJfaWQiOjJ9.rr5xRmrM30BFujgbwgNZgccZulj01Ve8SQmvKecP3l8	2023-12-30 10:58:59.374007-05	2023-12-31 10:58:59-05	\N	777f761bb9814dfbb43dab16f4d392c8
32	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcwNDAzODM0NywiaWF0IjoxNzAzOTUxOTQ3LCJqdGkiOiJiMzY5NzUxYmY0NzE0MDFmOTU2OGU4MTBhZmMwNGM4NCIsInVzZXJfaWQiOjJ9.m8fu7OvGaDzfKWb7_WTSMjKdhY_GmMVCeda3zPQIqaQ	2023-12-30 10:59:07.755727-05	2023-12-31 10:59:07-05	\N	b369751bf471401f9568e810afc04c84
33	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcwNDMzOTc2NiwiaWF0IjoxNzA0MjUzMzY2LCJqdGkiOiI5ZDdkZDU5MTZlYjQ0YzJhYWZkNjU2MjJkMzNlZDZlYSIsInVzZXJfaWQiOjJ9.G-fToxI4XPY7ZkdxYvWkrcIvX7zci6v__m6TwKQ-nvA	2024-01-02 22:42:46.995644-05	2024-01-03 22:42:46-05	\N	9d7dd5916eb44c2aafd65622d33ed6ea
34	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcwNDM3ODM4OCwiaWF0IjoxNzA0MjkxOTg4LCJqdGkiOiJkYmQwY2UxY2QwZmI0YzIzYjBlNGMxNDViMzNiMDdiMCIsInVzZXJfaWQiOjJ9.yIZiWtH655bTMUPXCnN-ZZwoAaXqMc28zapWIyERhAI	2024-01-03 09:26:28.679759-05	2024-01-04 09:26:28-05	\N	dbd0ce1cd0fb4c23b0e4c145b33b07b0
35	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcwNDU2MzUwMSwiaWF0IjoxNzA0NDc3MTAxLCJqdGkiOiI2ZTM2M2Y5YWRmMTM0ZDBhOTc4NjQ2ODgzM2RhYzA3OSIsInVzZXJfaWQiOjJ9.NEDH6_0a7-G2L_X68w6BpPCSwpCvj3X9PYfePh6D9MU	2024-01-05 12:51:41.568334-05	2024-01-06 12:51:41-05	\N	6e363f9adf134d0a9786468833dac079
36	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcwNDU2MzgyOSwiaWF0IjoxNzA0NDc3NDI5LCJqdGkiOiI4ZGYyNTU1M2YyMDc0ZDI5OTI5NDVkYmVmMTQ1NGU5MiIsInVzZXJfaWQiOjJ9.3skddarzXGLu7rTTpouaot1Y2jpV1qtMN3bDMYFGGOI	2024-01-05 12:57:09.276308-05	2024-01-06 12:57:09-05	\N	8df25553f2074d2992945dbef1454e92
37	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcwNDU2NDE0NCwiaWF0IjoxNzA0NDc3NzQ0LCJqdGkiOiI4MGQzN2UyYzRlNzE0MDU2OTJkOWJlNzVmNzcyMDY5YyIsInVzZXJfaWQiOjJ9.JU8lf6cDOhJlWSGZouiPYWPZNdM2jpD9CQAbZFjQFIU	2024-01-05 13:02:24.852575-05	2024-01-06 13:02:24-05	\N	80d37e2c4e71405692d9be75f772069c
38	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcwNDU2NDQ2MSwiaWF0IjoxNzA0NDc4MDYxLCJqdGkiOiIzMjI4Y2Q4OWIyZjE0ZWUyOWU5ZTQyZDQ2YjdlNWEwMSIsInVzZXJfaWQiOjJ9.iSf3ae6qODFTFllxxs_eGPgfQ6Gc9uYRVrYMPMAaavI	2024-01-05 13:07:41.452957-05	2024-01-06 13:07:41-05	\N	3228cd89b2f14ee29e9e42d46b7e5a01
39	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcwNDU2NzMzMSwiaWF0IjoxNzA0NDgwOTMxLCJqdGkiOiI5ZTc3YWMxZjNhYzY0NTliYjBjOTBjODY2YzE4YWE2NCIsInVzZXJfaWQiOjJ9.efCVvenhlrQmKFV_vwqQD6J3tVoQB1WB1-f2t_sarJ8	2024-01-05 13:55:31.825701-05	2024-01-06 13:55:31-05	\N	9e77ac1f3ac6459bb0c90c866c18aa64
40	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcwNDU2NzY2MiwiaWF0IjoxNzA0NDgxMjYyLCJqdGkiOiIzNDRjNDI0ZWNhOGI0MGY4ODFjYTY3Njc2NjZhYTg4NyIsInVzZXJfaWQiOjJ9.thwnvEva_w-Y_2UZQTQsCpCQ9VqOLc0A2qnYi1F_S6Y	2024-01-05 14:01:02.749904-05	2024-01-06 14:01:02-05	\N	344c424eca8b40f881ca6767666aa887
41	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcwNDU2ODE0MSwiaWF0IjoxNzA0NDgxNzQxLCJqdGkiOiJiZTIwZDVlMmJmMzE0MzI2YTcxODgzN2E4YmRkNjNiMyIsInVzZXJfaWQiOjJ9.M_m3XPnjckHZ_QKKM5Z2VWKpB8A1dbv5zRSJoVqCCyc	2024-01-05 14:09:01.079076-05	2024-01-06 14:09:01-05	\N	be20d5e2bf314326a718837a8bdd63b3
42	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcwNDU2OTQ3NSwiaWF0IjoxNzA0NDgzMDc1LCJqdGkiOiI0ZTIwZDExNTVjZjE0YzJmODlhMjU5NmJiOGQ5NTE1NCIsInVzZXJfaWQiOjJ9.Hy_FPXIAXmQBIT76ON9HUUuNexVvgzG1ae33HlH6gIM	2024-01-05 14:31:15.358245-05	2024-01-06 14:31:15-05	\N	4e20d1155cf14c2f89a2596bb8d95154
44	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcwNDU2OTkxNywiaWF0IjoxNzA0NDgzNTE3LCJqdGkiOiJiNjkzNGI0MWUxMGE0ZjkwYWM0YTEzMzRmYjY5M2VmMiIsInVzZXJfaWQiOjJ9.2zQ-LpzLqRe7V0kQchbZOwt-u6yQAM2-7W3ZLooYCdQ	2024-01-05 14:38:37.894513-05	2024-01-06 14:38:37-05	\N	b6934b41e10a4f90ac4a1334fb693ef2
45	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcwNDU3MDI1NywiaWF0IjoxNzA0NDgzODU3LCJqdGkiOiJiMjY0N2FhNDRjNTQ0MGJlYmYwNGY3MDNkNzg3Y2IwMyIsInVzZXJfaWQiOjJ9.RZ6O96fxxOZ15QLMCQkP3nA_gLxQC9I6kE34g2Q5Eyk	2024-01-05 14:44:17.73295-05	2024-01-06 14:44:17-05	\N	b2647aa44c5440bebf04f703d787cb03
46	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcwNDU3MDU3MSwiaWF0IjoxNzA0NDg0MTcxLCJqdGkiOiI1NDAxOTMzMDFjMzk0NDU5ODI2MmRkZmJjMThlMWJjYiIsInVzZXJfaWQiOjJ9.2GWRL0pslacuj3shwIJ5ZZVf84FESNPNDB33IQBybVg	2024-01-05 14:49:31.263819-05	2024-01-06 14:49:31-05	\N	540193301c3944598262ddfbc18e1bcb
48	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcwNDU3MDc5NSwiaWF0IjoxNzA0NDg0Mzk1LCJqdGkiOiJhMTA4YWE1OTE5Njg0OTBiOTdhMjEzZDEwMDM2OGFhNCIsInVzZXJfaWQiOjJ9.b_5jNA_L1RWvvo0uLfnt6UnLooe8TOpL_JaYfbQ0Zo4	2024-01-05 14:53:15.347465-05	2024-01-06 14:53:15-05	\N	a108aa591968490b97a213d100368aa4
50	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcwNDU3MTAzMywiaWF0IjoxNzA0NDg0NjMzLCJqdGkiOiI0OTdiZjJmMWMyZjY0Y2IzYjMyZDNiMjY2ZTk3ZjU0YyIsInVzZXJfaWQiOjJ9.GKqh1ZRSdxr6tt-MDciSMlRRcz-ACWaryCO19u2I290	2024-01-05 14:57:13.262733-05	2024-01-06 14:57:13-05	\N	497bf2f1c2f64cb3b32d3b266e97f54c
51	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcwNDU3MTIzOSwiaWF0IjoxNzA0NDg0ODM5LCJqdGkiOiIxMzI0YTVlOTM1MmQ0ZjZkYjgwNzI4NDE1Y2FjOGVlNSIsInVzZXJfaWQiOjJ9.JiE8lyYMsXGQnz8u7GNenF5Z7eV-zFV8jnFIcmK8r24	2024-01-05 15:00:39.962832-05	2024-01-06 15:00:39-05	\N	1324a5e9352d4f6db80728415cac8ee5
52	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcwNDU5ODI4NiwiaWF0IjoxNzA0NTExODg2LCJqdGkiOiJmNWRjMjgxYWRhOTE0MzNiYTBjY2EwN2ZmNWI0ODBjOSIsInVzZXJfaWQiOjJ9.1blTdeHigMeE317ZRdfmwRfLnxEwzba88TXgCVv8XkA	2024-01-05 22:31:26.386921-05	2024-01-06 22:31:26-05	\N	f5dc281ada91433ba0cca07ff5b480c9
60	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcwNDc5MzQyNiwiaWF0IjoxNzA0NzA3MDI2LCJqdGkiOiI3OWIwOWU5MzA1OGM0YjAwYjhhNmNjMTQ2NTM1OWQwZCIsInVzZXJfaWQiOjJ9.lvVgruntz0y3uRV4I5i9RptnU2hWHGcSt5ZtgU1v6fA	2024-01-08 04:43:46.983734-05	2024-01-09 04:43:46-05	\N	79b09e93058c4b00b8a6cc1465359d0d
101	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcwNjE2NzMwNSwiaWF0IjoxNzA2MTUyOTA1LCJqdGkiOiIyNTZjYzgzNmIxOGM0M2E5OGM0MDhhZmFkOWU2ZWVkYyIsInVzZXJfaWQiOjJ9.g7IKMm-Tl05j_jxih2BIXque8nuGBIT2ynjki9GVIdA	2024-01-24 22:21:45.336569-05	2024-01-25 02:21:45-05	\N	256cc836b18c43a98c408afad9e6eedc
103	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcwNjIyMzMyMiwiaWF0IjoxNzA2MjA4OTIyLCJqdGkiOiJjMjllZmVhMTIxMTY0MDcxODg5NjUzZTEwY2JkOWM4ZiIsInVzZXJfaWQiOjJ9.YGTskh8EZz3_DylaL2SddGaHvKdpG5ix9OVNLRFDnQM	2024-01-25 13:55:22.29506-05	2024-01-25 17:55:22-05	\N	c29efea121164071889653e10cbd9c8f
104	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcwNjMwOTYyMiwiaWF0IjoxNzA2Mjk1MjIyLCJqdGkiOiJlYTA2NDhlYzQ4ZDY0MjMwYmJiNGEwZjZjOWRiYmQ2MCIsInVzZXJfaWQiOjJ9.y1tr6J6vlCeAEQ4uqb-Oh725j4Y4VY1BOUlK5L84EXM	2024-01-26 13:53:42.109068-05	2024-01-26 17:53:42-05	\N	ea0648ec48d64230bbb4a0f6c9dbbd60
105	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcwNjMyNzMzNCwiaWF0IjoxNzA2MzEyOTM0LCJqdGkiOiIyY2RmOTFlYzYyZDk0Mjk2OThhNWViMWY1YzFkZGYyMyIsInVzZXJfaWQiOjJ9.fisU6yv5Jzia-3s5_sIJ39JVa8Nju0VpVWFEZrfhR-U	2024-01-26 18:48:54.739983-05	2024-01-26 22:48:54-05	\N	2cdf91ec62d9429698a5eb1f5c1ddf23
106	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcwNjQxMDEwNywiaWF0IjoxNzA2Mzk1NzA3LCJqdGkiOiJmYjEzNWYyOGVmODk0MThjOWFkMTdkYjNkYjg5YzAyNCIsInVzZXJfaWQiOjJ9.Qhx3PlfEepO-_4Nnbu_RuCVkA0LwcTTJjM1SriV5rUM	2024-01-27 17:48:27.755864-05	2024-01-27 21:48:27-05	\N	fb135f28ef89418c9ad17db3db89c024
109	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcwNjUwMjgwNCwiaWF0IjoxNzA2NDg4NDA0LCJqdGkiOiI4N2IyNDEzMTU3MGY0ODg1OTZhMDg4ZDliZWRmZWY1MiIsInVzZXJfaWQiOjR9.C8QYFRwdEOsjf9-RFXc0Q8SV_MHq7fIAZ-V7O_0I3Sc	2024-01-28 19:33:24.980424-05	2024-01-28 23:33:24-05	4	87b24131570f488596a088d9bedfef52
110	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcwNjU5NzkwMiwiaWF0IjoxNzA2NTgzNTAyLCJqdGkiOiJhMmU2Y2ExMTQzNTY0ZDEwYTRmNTI3YTlmNzA1YzZkYSIsInVzZXJfaWQiOjN9.5W-gZtjkavgo4nOdn-8j6UactL1FDNnnXH7RvvTajk0	2024-01-29 21:58:22.011696-05	2024-01-30 01:58:22-05	3	a2e6ca1143564d10a4f527a9f705c6da
111	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcwNjU5NzkyMCwiaWF0IjoxNzA2NTgzNTIwLCJqdGkiOiJjNjExZTZmNGRhNTI0ZGFhYmUyNmNhNTQwYmY2NGI5NCIsInVzZXJfaWQiOjZ9.jSV3blwUb0I3rFK3W08Ic_E_gkj3XWtxjXNPYCYRqWU	2024-01-29 21:58:40.941807-05	2024-01-30 01:58:40-05	6	c611e6f4da524daabe26ca540bf64b94
112	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcwNjY5MDY3NCwiaWF0IjoxNzA2Njc2Mjc0LCJqdGkiOiI4MzIyNWE4M2ViMzU0MmJhYWVjYzYwZGRmYjU2ZWRhZCIsInVzZXJfaWQiOjN9.0jU3WTPEJ7TxbEDAdN3fVhioEo8lHStNAWNGaBS-1Ng	2024-01-30 23:44:34.690465-05	2024-01-31 03:44:34-05	3	83225a83eb3542baaecc60ddfb56edad
113	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcwNjY5MDcwNCwiaWF0IjoxNzA2Njc2MzA0LCJqdGkiOiJkYmQzN2JlY2MxYTU0NDJmYmU3MDQ2NmJlODQ0MjNlZSIsInVzZXJfaWQiOjZ9.lncbtK4uSAvJdu33wa4NkG0irFQ0SupIG2AiZ0KqEsA	2024-01-30 23:45:04.695861-05	2024-01-31 03:45:04-05	6	dbd37becc1a5442fbe70466be84423ee
114	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcwNjcwNjA2NiwiaWF0IjoxNzA2NjkxNjY2LCJqdGkiOiIwMGE3ODAxZGY1YjY0OWM3OGNlN2UyNjc5YzgxZGJkNiIsInVzZXJfaWQiOjZ9.s8twAlFqF_ZE7dzl__ZzzLS1FqhycN6ZJNDmm3zDHR0	2024-01-31 04:01:06.709997-05	2024-01-31 08:01:06-05	6	00a7801df5b649c78ce7e2679c81dbd6
115	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcwNjcxNzkyNiwiaWF0IjoxNzA2NzAzNTI2LCJqdGkiOiI5ZTdiYWNiMWY2MDg0YjMzOTVkYTBmYzQxMWQ5NjQ3NiIsInVzZXJfaWQiOjN9.uxqUgpHiDARKE_C7DtgldpoBK4y-xtK9SSvFR46UsS4	2024-01-31 07:18:46.041427-05	2024-01-31 11:18:46-05	3	9e7bacb1f6084b3395da0fc411d96476
116	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcwNjcxNzk2OCwiaWF0IjoxNzA2NzAzNTY4LCJqdGkiOiI2MTJjNDYwNDcyODM0NjgzYTE3NDg5MzFkMTUwZmE0OSIsInVzZXJfaWQiOjR9.Q35yJQQSZCbrC1q7zbicakdZ_cgNy8sqqoTfMc4OnWo	2024-01-31 07:19:28.77195-05	2024-01-31 11:19:28-05	4	612c460472834683a1748931d150fa49
117	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcwNjcxODEyNCwiaWF0IjoxNzA2NzAzNzI0LCJqdGkiOiJkYmZmMmFlNGFiZjk0NTY1OGEwZmEzZTNiNjkxZTRmNyIsInVzZXJfaWQiOjN9.285SYSZKdzD5gsun2aJJN1TsMOOOAwAYdwA--mJtbmo	2024-01-31 07:22:04.428211-05	2024-01-31 11:22:04-05	3	dbff2ae4abf945658a0fa3e3b691e4f7
118	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcwNjcxODE3MiwiaWF0IjoxNzA2NzAzNzcyLCJqdGkiOiI2NWZkMWU3ZThlMWM0NGVmOTI2NDI2ZmJmMzRjMmY2MyIsInVzZXJfaWQiOjR9.ez6CAwZzvUl8djcHeh7MZzzH4mocQp0PxuMi8ESMdKs	2024-01-31 07:22:52.717872-05	2024-01-31 11:22:52-05	4	65fd1e7e8e1c44ef926426fbf34c2f63
119	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcwNjcyNTkxNywiaWF0IjoxNzA2NzExNTE3LCJqdGkiOiJiMjM1ZTA3ZTQ3OGM0NzA3ODNiN2M1YTViM2JjMjM2YyIsInVzZXJfaWQiOjN9.N9JZpzZwhcypSwVOPjWHYmnH1uoC5xXMuU_GccFPucg	2024-01-31 09:31:57.36711-05	2024-01-31 13:31:57-05	3	b235e07e478c470783b7c5a5b3bc236c
120	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcwNjcyNTkzOCwiaWF0IjoxNzA2NzExNTM4LCJqdGkiOiI5OGNmYzlmM2QyYWQ0N2Q0OTQxMTkwMGFmYjY5ZGNjOCIsInVzZXJfaWQiOjR9.MUyFQ1tiNwHAb81cDj9mJ_xHS_3q6IRGio_86-H11Ps	2024-01-31 09:32:18.991471-05	2024-01-31 13:32:18-05	4	98cfc9f3d2ad47d49411900afb69dcc8
121	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcwNjcyNjAwMCwiaWF0IjoxNzA2NzExNjAwLCJqdGkiOiJkZTg2NTc5ZjZkOTc0ZDhmODBhYmM2MmI4NjQ1YTFjOSIsInVzZXJfaWQiOjZ9.V7PBeWB2ZCJ01JJoGg6UqqRdhm0tOmtjrWx3oJkSOcg	2024-01-31 09:33:20.381195-05	2024-01-31 13:33:20-05	6	de86579f6d974d8f80abc62b8645a1c9
122	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcwNjcyNjk0MiwiaWF0IjoxNzA2NzEyNTQyLCJqdGkiOiI2MDllNzRlMTEyZWE0NTgyODY2YzMwZjY3YjZhYWU5MSIsInVzZXJfaWQiOjR9.XbyJ-N4qS0iJkJe-I_xy-_L9J31KLZwxhxn0jZo1iAg	2024-01-31 09:49:02.114598-05	2024-01-31 13:49:02-05	4	609e74e112ea4582866c30f67b6aae91
123	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcwNjcyNzgzOCwiaWF0IjoxNzA2NzEzNDM4LCJqdGkiOiJkNDI0NjhmODgwNmY0NDM1ODRhMjNlYTdiOTBhOThjZCIsInVzZXJfaWQiOjN9.zNezA4F_rPEuGI7uG6DApph3Z_DrX2R52mTTOsdLcaw	2024-01-31 10:03:58.61569-05	2024-01-31 14:03:58-05	3	d42468f8806f443584a23ea7b90a98cd
124	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcwNjcyNzg3NiwiaWF0IjoxNzA2NzEzNDc2LCJqdGkiOiJjYjE1YTRhM2Y1MGQ0NjhiOTA5NGU0NmViYzNhNmIyYiIsInVzZXJfaWQiOjR9.UomC6Qi8KaJ3_MY0j1XIrByMHmPTtAW6EFBg6MYyAOU	2024-01-31 10:04:36.259027-05	2024-01-31 14:04:36-05	4	cb15a4a3f50d468b9094e46ebc3a6b2b
125	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcwNjczMDg0OSwiaWF0IjoxNzA2NzE2NDQ5LCJqdGkiOiI1ZjhlNDAxNDc2MDY0M2NiYmM2M2FiOGZhOTNjNGFiOCIsInVzZXJfaWQiOjR9.job8wCBG6X_60IM6zhhOOAMkkdAN6q6i3Cawljm4SqM	2024-01-31 10:54:09.25799-05	2024-01-31 14:54:09-05	4	5f8e4014760643cbbc63ab8fa93c4ab8
126	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcwNjczMzE2OSwiaWF0IjoxNzA2NzE4NzY5LCJqdGkiOiIwMGMwMDYwNDI0MmU0YzgyYjFlMmE3NDgwYjY5MGMzMyIsInVzZXJfaWQiOjN9.yWYax134n8iyYtJYXeQYg05Vkn3hq3XnYRZpxHADq0s	2024-01-31 11:32:49.322828-05	2024-01-31 15:32:49-05	3	00c00604242e4c82b1e2a7480b690c33
127	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcwNjczMzI0NSwiaWF0IjoxNzA2NzE4ODQ1LCJqdGkiOiI1MTAzMjg0NGQ4Y2Q0NmNiODMzMDNjNmFlNDY2NDRkYSIsInVzZXJfaWQiOjN9.593VNTKQ4CoaFwOznPQC1EL_-IolaZEZhsQydH4kH9k	2024-01-31 11:34:05.013167-05	2024-01-31 15:34:05-05	3	51032844d8cd46cb83303c6ae46644da
128	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcwNjczMzMxNiwiaWF0IjoxNzA2NzE4OTE2LCJqdGkiOiIxY2QwZGQ4NjY3NjE0ZDIzOWM5YWQ2MTYxNDE3ZTlhNCIsInVzZXJfaWQiOjR9.bCv-kfsMAdOPjO5Lgah-qmb1yO2DEW1D03OpswzjjrQ	2024-01-31 11:35:16.378679-05	2024-01-31 15:35:16-05	4	1cd0dd8667614d239c9ad6161417e9a4
129	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcwNjczMzczNSwiaWF0IjoxNzA2NzE5MzM1LCJqdGkiOiJkZTAxOTA1YzVjODA0OGNhOTkxYmUzOGE2OTQ5OGU4OSIsInVzZXJfaWQiOjZ9.LaJ0UYbIU_axHC9xjSpKQwSd-YRfNuvMk-meXONrfBs	2024-01-31 11:42:15.8152-05	2024-01-31 15:42:15-05	6	de01905c5c8048ca991be38a69498e89
130	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcwNjczNDM1OSwiaWF0IjoxNzA2NzE5OTU5LCJqdGkiOiJhNWRiYzJkODlmMDY0OWZmODk1ZjVlNDFjMjFmZjBhYiIsInVzZXJfaWQiOjN9.chVkHVdA5oDsHQ1P2N6tY_BncRpgjs4gaSqnTaeEHJ4	2024-01-31 11:52:39.287317-05	2024-01-31 15:52:39-05	3	a5dbc2d89f0649ff895f5e41c21ff0ab
131	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcwNjg2NjU0OSwiaWF0IjoxNzA2ODUyMTQ5LCJqdGkiOiJkNTFkMjhlYTMxZjg0NGVhYTAxZWM5MDVhNGQ3Njk1NCIsInVzZXJfaWQiOjN9.ytII3WrW2YZabWA0N2skV8wlGEllbW9A8Mg7s33A--M	2024-02-02 00:35:49.341485-05	2024-02-02 04:35:49-05	3	d51d28ea31f844eaa01ec905a4d76954
132	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcwNjg4MDY5MSwiaWF0IjoxNzA2ODY2MjkxLCJqdGkiOiJlNjUyZDAwOGQzODA0OGM1YTUzZDQwOTU1MzUwZDliYyIsInVzZXJfaWQiOjR9.Z49mSLj4hMVfx43O91ev6Oa5tibPvLDuzoYnz07y0j4	2024-02-02 04:31:31.525829-05	2024-02-02 08:31:31-05	4	e652d008d38048c5a53d40955350d9bc
133	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcwNjg4MDcyMiwiaWF0IjoxNzA2ODY2MzIyLCJqdGkiOiI2Y2I2ZTY5ZDQ1Y2M0MTc0YTM2YmM0NzkwYjllNGEzOSIsInVzZXJfaWQiOjN9.420EtbZfYQ6WlsJDM1YS71AFDXjBmm26YQ_Ql4l0N5o	2024-02-02 04:32:02.57732-05	2024-02-02 08:32:02-05	3	6cb6e69d45cc4174a36bc4790b9e4a39
134	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcwNjg4MDc1NiwiaWF0IjoxNzA2ODY2MzU2LCJqdGkiOiJmZDk1N2VjODc4YWY0NjVmOTk3MmM0ODQ4YTc2ZmQ1MSIsInVzZXJfaWQiOjR9.iLMN4hAr4-p8_KBjzhlheE2LXk6aKSw27fzsTQDkvm4	2024-02-02 04:32:36.789449-05	2024-02-02 08:32:36-05	4	fd957ec878af465f9972c4848a76fd51
135	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcwNjg4MDc4NiwiaWF0IjoxNzA2ODY2Mzg2LCJqdGkiOiI0ZTQzOTJlZGRhY2E0MmM5OGNhNjYzYjAxZjg3YzkxNyIsInVzZXJfaWQiOjZ9.YBJuFf7_dh38eHlgm5x3T3afHucO2Y2GzxEZ1e3C-3k	2024-02-02 04:33:06.077587-05	2024-02-02 08:33:06-05	6	4e4392eddaca42c98ca663b01f87c917
136	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcwNjkzMDQ0NSwiaWF0IjoxNzA2OTE2MDQ1LCJqdGkiOiIzODVmOGZkMjg5Zjk0Nzk1YWYxMGVjNDJkYTM0NzIxNSIsInVzZXJfaWQiOjN9.wELhw2WTVlwtVf7FF0ozlvUB8xrqCAv9Urnh-KC5pU8	2024-02-02 18:20:45.472973-05	2024-02-02 22:20:45-05	3	385f8fd289f94795af10ec42da347215
137	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcwNjkzMDc1NiwiaWF0IjoxNzA2OTE2MzU2LCJqdGkiOiI1ODQ4NWJmNDY2NDU0ZDI2OWMxNDRhZWExNDFhYWYyOSIsInVzZXJfaWQiOjR9.OSY0TIODf6LfRYwffy57ws3KqLiLYVNoAOCwuyR_oQM	2024-02-02 18:25:56.109608-05	2024-02-02 22:25:56-05	4	58485bf466454d269c144aea141aaf29
138	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcwNjkzMDgzNSwiaWF0IjoxNzA2OTE2NDM1LCJqdGkiOiI3MzA5ODI0NmFkZmQ0MjNmYjg4NmI2Mzk2YjAwNWNhYiIsInVzZXJfaWQiOjZ9.GhKomXerF0GktiqCb1K2RjwYB4WbayWSfELdMrzF3tw	2024-02-02 18:27:15.159016-05	2024-02-02 22:27:15-05	6	73098246adfd423fb886b6396b005cab
139	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcwNjkzMTA5NywiaWF0IjoxNzA2OTE2Njk3LCJqdGkiOiI1Mzg0MGU0ZmZlOTE0ZDE3ODQ2MWFiMTQzZDY4OTE4OSIsInVzZXJfaWQiOjN9.sQzulz_NfveocY37kViguzRHcaB-VwyaYQB6TOPouKM	2024-02-02 18:31:37.477092-05	2024-02-02 22:31:37-05	3	53840e4ffe914d178461ab143d689189
140	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcwNjkzMTEyNiwiaWF0IjoxNzA2OTE2NzI2LCJqdGkiOiIxZDVmNTU1MTJkYmE0MDE5OGVlNTYxM2UxNDJmNTUwMiIsInVzZXJfaWQiOjR9.4UBneWwdwZhC8QxA7y6x90IrNNrD-vt42Y1vkDlgOPQ	2024-02-02 18:32:06.383109-05	2024-02-02 22:32:06-05	4	1d5f55512dba40198ee5613e142f5502
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
1	Pago Contado	A
\.


--
-- Data for Name: ventas_cotizacion; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.ventas_cotizacion (id, nombre, fecha, duracion, estado_id, proyecto_id, tipo_id) FROM stdin;
1	Pago Contado Socabaya	2024-01-03 10:46:48-05	2	A	1	1
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

COPY public.ventas_lead (id, nombre, apellido, asignado, celular, celular2, comentario, "horaRecepcion", llamar, "recienCreado", fecha_creacion, fecha_actualizacion, asesor_id, campania_id, estado_id, "estadoLead_id", objecion_id, "usuarioActualizador_id", "usuarioCreador_id", fecha_asignacion, fecha_desasignacion) FROM stdin;
10			f	934789123			2023-12-29 18:35:30-05	t	t	2024-01-24 19:00:00-05	2024-01-25 15:28:16.36108-05	\N	3	A	EP	1	1	1	\N	\N
4			t	934789123			2023-12-29 18:33:45.920404-05	t	t	2024-01-26 19:00:00-05	2024-01-27 18:00:04.028532-05	1	3	A	EP	1	1	1	\N	\N
9	Jesus		t	958742315			2023-12-29 18:35:30-05	t	t	2024-01-26 19:00:00-05	2024-01-27 18:00:04.043648-05	1	2	A	EP	1	1	1	\N	\N
2	aaaa	aaaaaaa	t	999875468		Pidio un asesor personal	2023-10-04 00:00:00-05	t	t	2024-01-26 19:00:00-05	2024-01-27 18:00:04.06136-05	1	1	A	EP	1	1	1	\N	\N
1	BRIAN	VELASCO	t	935488033			2023-12-29 15:54:52-05	t	t	2024-01-26 19:00:00-05	2024-01-27 18:03:50.626188-05	1	1	A	NR	1	1	4	\N	\N
11	Andrew	Jacobo	t	970455267			2024-01-31 07:15:18.17322-05	t	t	2024-01-31 07:16:58.936598-05	2024-01-31 07:16:58.936598-05	4	4	A	EP	1	\N	6	2024-01-31 07:16:58.936598-05	\N
5	aaaa	aaaaaaa	t	999875468		Pidio un asesor personal	2023-10-04 00:00:00-05	t	t	2024-01-31 11:38:47.808637-05	2024-01-31 11:38:47.808637-05	4	1	A	EP	1	1	1	2024-01-31 11:38:47.808637-05	\N
7			t	934789123			2023-12-29 18:34:47.930827-05	t	t	2024-01-31 11:38:47.83371-05	2024-01-31 11:38:47.83371-05	4	3	A	EP	1	1	1	2024-01-31 11:38:47.83371-05	\N
12	Rony	Ventura	f	970455266			2024-01-31 11:48:06.077237-05	t	t	2024-01-31 11:48:06.077237-05	\N	\N	4	A	EP	1	\N	6	\N	\N
\.


--
-- Data for Name: ventas_desasignacionleadasesor; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.ventas_desasignacionleadasesor (id, fecha, lead_id, usuario_id) FROM stdin;
2	2024-01-24 19:00:00-05	1	3
3	2024-01-24 19:00:00-05	9	4
1	2024-01-23 19:00:00-05	1	\N
4	2024-01-24 19:00:00-05	10	\N
\.


--
-- Data for Name: ventas_estadoevento; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.ventas_estadoevento (id, nombre, estado_id) FROM stdin;
\.


--
-- Data for Name: ventas_tipoevento; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.ventas_tipoevento (id, nombre, estado_id) FROM stdin;
3	Visita oficina	A
4	Visita campo	A
\.


--
-- Data for Name: ventas_evento; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.ventas_evento (id, titulo, duracion, fecha_visita, observacion, fecha_creacion, fecha_actualizacion, separado, asesor_id, estado_id, "estadoEvento_id", lead_id, tipo_id, "usuarioActualizador_id", "usuarioCreador_id") FROM stdin;
\.


--
-- Data for Name: ventas_historicoleadasesor; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.ventas_historicoleadasesor (id, fecha_creacion, lead_id, usuario_id) FROM stdin;
4	2024-01-24 19:00:00-05	1	4
5	2024-01-24 19:00:00-05	2	4
7	2024-01-24 19:00:00-05	1	1
8	2024-01-24 19:00:00-05	2	1
10	2024-01-26 19:00:00-05	9	1
12	2024-01-26 19:00:00-05	4	1
14	2024-01-26 19:00:00-05	9	1
16	2024-01-26 19:00:00-05	2	1
18	2024-01-26 19:00:00-05	9	1
20	2024-01-26 19:00:00-05	4	1
22	2024-01-26 19:00:00-05	9	1
24	2024-01-26 19:00:00-05	2	1
26	2024-01-26 19:00:00-05	9	1
28	2024-01-26 19:00:00-05	4	1
30	2024-01-26 19:00:00-05	9	1
32	2024-01-26 19:00:00-05	2	1
34	2024-01-26 19:00:00-05	9	1
36	2024-01-26 19:00:00-05	4	1
38	2024-01-26 19:00:00-05	9	1
40	2024-01-26 19:00:00-05	2	1
42	2024-01-26 19:00:00-05	1	1
6	2024-01-24 19:00:00-05	\N	4
9	2024-01-24 19:00:00-05	\N	1
1	2024-01-24 19:00:00-05	1	\N
2	2024-01-24 19:00:00-05	2	\N
3	2024-01-24 19:00:00-05	\N	\N
11	2024-01-26 19:00:00-05	\N	\N
13	2024-01-26 19:00:00-05	\N	\N
15	2024-01-26 19:00:00-05	\N	\N
17	2024-01-26 19:00:00-05	\N	\N
19	2024-01-26 19:00:00-05	\N	\N
21	2024-01-26 19:00:00-05	\N	\N
23	2024-01-26 19:00:00-05	\N	\N
25	2024-01-26 19:00:00-05	\N	\N
27	2024-01-26 19:00:00-05	\N	\N
29	2024-01-26 19:00:00-05	\N	\N
31	2024-01-26 19:00:00-05	\N	\N
33	2024-01-26 19:00:00-05	\N	\N
35	2024-01-26 19:00:00-05	\N	\N
37	2024-01-26 19:00:00-05	\N	\N
39	2024-01-26 19:00:00-05	\N	\N
41	2024-01-26 19:00:00-05	\N	\N
43	2024-01-31 07:16:58.950611-05	11	4
44	2024-01-31 11:38:47.829367-05	5	4
45	2024-01-31 11:38:47.836484-05	7	4
\.


--
-- Data for Name: ventas_llamada; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.ventas_llamada (id, detalle, contesto, fecha_creacion, fecha_actualizacion, estado_id, lead_id, objecion_id, "usuarioActualizador_id", "usuarioCreador_id", asesor_id) FROM stdin;
1	Mucho texto	t	2024-01-23 19:00:00-05	2024-01-24 21:39:22-05	A	1	10	4	4	\N
2	Mas texto	f	2024-01-23 19:00:00-05	2024-01-24 21:39:45-05	A	1	10	4	4	\N
\.


--
-- Data for Name: ventas_precio; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.ventas_precio (id, precio, cotizacion_id, estado_id, "tipoProducto_id") FROM stdin;
\.


--
-- Data for Name: ventas_proyectotipoproducto; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.ventas_proyectotipoproducto (id, proyecto_id, tipo_producto_id) FROM stdin;
\.


--
-- Data for Name: ventas_whatsapp; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.ventas_whatsapp (id, detalle, respondio, fecha_creacion, fecha_actualizacion, estado_id, lead_id, objecion_id, "usuarioActualizador_id", "usuarioCreador_id", asesor_id) FROM stdin;
1	Demastiado texto	f	2024-01-23 19:00:00-05	2024-01-24 21:40:14-05	A	1	6	4	4	\N
2	Mas texto	t	2024-01-23 19:00:00-05	2024-01-24 21:40:35-05	A	1	4	4	3	\N
\.


--
-- Name: auth_group_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.auth_group_id_seq', 1, true);


--
-- Name: auth_group_permissions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.auth_group_permissions_id_seq', 71, true);


--
-- Name: auth_permission_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.auth_permission_id_seq', 160, true);


--
-- Name: cuenta_modulo_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.cuenta_modulo_id_seq', 4, true);


--
-- Name: cuenta_user_groups_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.cuenta_user_groups_id_seq', 38, true);


--
-- Name: cuenta_user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.cuenta_user_id_seq', 9, true);


--
-- Name: cuenta_user_user_permissions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.cuenta_user_user_permissions_id_seq', 3, true);


--
-- Name: django_admin_log_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.django_admin_log_id_seq', 143, true);


--
-- Name: django_content_type_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.django_content_type_id_seq', 40, true);


--
-- Name: django_migrations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.django_migrations_id_seq', 57, true);


--
-- Name: marketing_campania_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.marketing_campania_id_seq', 4, true);


--
-- Name: marketing_categoria_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.marketing_categoria_id_seq', 2, true);


--
-- Name: marketing_proyecto_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.marketing_proyecto_id_seq', 2, true);


--
-- Name: multimedia_imagenproducto_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.multimedia_imagenproducto_id_seq', 2, true);


--
-- Name: multimedia_imagenproyecto_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.multimedia_imagenproyecto_id_seq', 1, true);


--
-- Name: multimedia_videoproducto_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.multimedia_videoproducto_id_seq', 1, false);


--
-- Name: multimedia_videoproyecto_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.multimedia_videoproyecto_id_seq', 1, false);


--
-- Name: token_blacklist_blacklistedtoken_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.token_blacklist_blacklistedtoken_id_seq', 1, false);


--
-- Name: token_blacklist_outstandingtoken_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.token_blacklist_outstandingtoken_id_seq', 140, true);


--
-- Name: ventas_cotizacion_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.ventas_cotizacion_id_seq', 1, true);


--
-- Name: ventas_cuota_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.ventas_cuota_id_seq', 1, false);


--
-- Name: ventas_desasignacionleadasesor_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.ventas_desasignacionleadasesor_id_seq', 4, true);


--
-- Name: ventas_estadoevento_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.ventas_estadoevento_id_seq', 1, true);


--
-- Name: ventas_evento_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.ventas_evento_id_seq', 1, true);


--
-- Name: ventas_historicoleadasesor_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.ventas_historicoleadasesor_id_seq', 45, true);


--
-- Name: ventas_lead_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.ventas_lead_id_seq', 12, true);


--
-- Name: ventas_llamada_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.ventas_llamada_id_seq', 2, true);


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

SELECT pg_catalog.setval('public.ventas_producto_id_seq', 1, true);


--
-- Name: ventas_proyectotipoproducto_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.ventas_proyectotipoproducto_id_seq', 1, false);


--
-- Name: ventas_tipocotizacion_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.ventas_tipocotizacion_id_seq', 1, true);


--
-- Name: ventas_tipocuota_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.ventas_tipocuota_id_seq', 1, false);


--
-- Name: ventas_tipoevento_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.ventas_tipoevento_id_seq', 4, true);


--
-- Name: ventas_tipoproducto_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.ventas_tipoproducto_id_seq', 1, true);


--
-- Name: ventas_whatsapp_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.ventas_whatsapp_id_seq', 2, true);


--
-- PostgreSQL database dump complete
--

