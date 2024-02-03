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
2	asesor
3	marketing
1	administrador
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
1	1	9
2	1	10
3	1	11
4	1	12
5	1	29
6	1	30
7	1	31
8	1	32
9	1	33
10	1	34
11	1	35
12	1	36
13	1	41
14	1	42
15	1	43
16	1	44
17	1	57
18	1	58
19	1	59
20	1	60
21	1	85
22	1	86
23	1	87
24	1	88
25	1	89
26	1	90
27	1	91
28	1	92
29	1	105
30	1	106
31	1	107
32	1	108
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
1	Gestión de usuarios	usuario	8	A
2	Gestión de roles	rol	3	A
3	Gestión de leads	lead	15	A
4	Gestión de eventos	evento	27	A
5	Gestión de campañas	campania	11	A
6	Gestión de proyectos	proyecto	9	A
7	Gestión de productos	producto	23	A
\.


--
-- Data for Name: cuenta_user; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.cuenta_user (id, password, last_login, is_superuser, username, first_name, last_name, email, is_staff, is_active, date_joined, "codigoAsesor", "isAdmin", estado_id) FROM stdin;
2	pbkdf2_sha256$600000$aqKfbEgZEXrO62vztAbBeQ$u0eR3M672XZ1MGheC869NFhDEUDwvaNkjlDGDBciALI=	2024-02-02 19:14:04-05	t	portilloAdmin	Portillo	Portillo	portillo@gmail.com	t	t	2024-02-02 19:11:58-05	\N	f	A
4	pbkdf2_sha256$600000$78MNGMTSnMi1Nsv4DMG4eO$0uE5zinV0PifmEsQ9ve1grxy2TtuH0ThBJJcxl8jOtA=	\N	f	andrew	Andrew Pold	Jacobo Castillo	pold.jacobo89@gmail.com	f	t	2024-02-02 20:26:41.550966-05	asesor_a	f	A
5	pbkdf2_sha256$600000$c4M3gCCY6SInFrRVZT9CHZ$I8D8ESVCYtp4k4x/7JqB6jXdujGXi8l054p/bMit4jE=	\N	f	jesus	Jesus	Begazo Ticona	jesus@gmail.com	f	f	2024-02-03 09:34:51.469146-05	asesor_b	f	A
\.


--
-- Data for Name: cuenta_user_groups; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.cuenta_user_groups (id, user_id, group_id) FROM stdin;
1	2	1
2	4	2
3	5	2
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
2	2024-02-02 19:15:10.64518-05	1	administrador	2	[{"changed": {"fields": ["Permissions"]}}]	3	2
3	2024-02-02 19:33:56.253625-05	1	Gestión de usuarios	1	[{"added": {}}]	7	2
4	2024-02-02 19:34:11.080253-05	2	Gestión de roles	1	[{"added": {}}]	7	2
5	2024-02-02 19:34:22.909564-05	2	Gestión de roles	2	[{"changed": {"fields": ["ContentType"]}}]	7	2
6	2024-02-02 19:34:37.779233-05	3	Gestión de leads	1	[{"added": {}}]	7	2
7	2024-02-02 19:35:14.639594-05	4	Gestión de eventos	1	[{"added": {}}]	7	2
8	2024-02-02 19:35:35.655528-05	5	Gestión de campañas	1	[{"added": {}}]	7	2
9	2024-02-02 19:35:59.0273-05	6	Gestión de proyectos	1	[{"added": {}}]	7	2
10	2024-02-02 19:36:16.521977-05	7	Gestión de productos	1	[{"added": {}}]	7	2
11	2024-02-02 19:38:59.871238-05	1	administrador	2	[{"changed": {"fields": ["Permissions"]}}]	3	2
12	2024-02-02 19:39:17.282302-05	2	portilloAdmin	2	[{"changed": {"fields": ["Groups"]}}]	8	2
\.


--
-- Data for Name: django_migrations; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.django_migrations (id, app, name, applied) FROM stdin;
1	contenttypes	0001_initial	2024-02-02 19:08:57.587757-05
2	contenttypes	0002_remove_content_type_name	2024-02-02 19:08:57.59539-05
3	auth	0001_initial	2024-02-02 19:08:57.65388-05
4	auth	0002_alter_permission_name_max_length	2024-02-02 19:08:57.663108-05
5	auth	0003_alter_user_email_max_length	2024-02-02 19:08:57.663198-05
6	auth	0004_alter_user_username_opts	2024-02-02 19:08:57.675104-05
7	auth	0005_alter_user_last_login_null	2024-02-02 19:08:57.680108-05
8	auth	0006_require_contenttypes_0002	2024-02-02 19:08:57.682761-05
9	auth	0007_alter_validators_add_error_messages	2024-02-02 19:08:57.68821-05
10	auth	0008_alter_user_username_max_length	2024-02-02 19:08:57.694765-05
11	auth	0009_alter_user_last_name_max_length	2024-02-02 19:08:57.698043-05
12	auth	0010_alter_group_name_max_length	2024-02-02 19:08:57.710732-05
13	auth	0011_update_proxy_permissions	2024-02-02 19:08:57.716355-05
14	auth	0012_alter_user_first_name_max_length	2024-02-02 19:08:57.724682-05
15	cuenta	0001_initial	2024-02-02 19:08:57.825656-05
16	admin	0001_initial	2024-02-02 19:08:57.855239-05
17	admin	0002_logentry_remove_auto_add	2024-02-02 19:08:57.857507-05
18	admin	0003_logentry_add_action_flag_choices	2024-02-02 19:08:57.873421-05
19	marketing	0001_initial	2024-02-02 19:08:57.97314-05
20	ventas	0001_initial	2024-02-02 19:08:58.60673-05
21	multimedia	0001_initial	2024-02-02 19:08:58.718484-05
22	sessions	0001_initial	2024-02-02 19:08:58.734463-05
23	token_blacklist	0001_initial	2024-02-02 19:08:58.794403-05
24	token_blacklist	0002_outstandingtoken_jti_hex	2024-02-02 19:08:58.809015-05
25	token_blacklist	0003_auto_20171017_2007	2024-02-02 19:08:58.826362-05
26	token_blacklist	0004_auto_20171017_2013	2024-02-02 19:08:58.853919-05
27	token_blacklist	0005_remove_outstandingtoken_jti	2024-02-02 19:08:58.869313-05
28	token_blacklist	0006_auto_20171017_2113	2024-02-02 19:08:58.954606-05
29	token_blacklist	0007_auto_20171017_2214	2024-02-02 19:08:58.996342-05
30	token_blacklist	0008_migrate_to_bigautofield	2024-02-02 19:08:59.060546-05
31	token_blacklist	0010_fix_migrate_to_bigautofield	2024-02-02 19:08:59.108742-05
32	token_blacklist	0011_linearizes_history	2024-02-02 19:08:59.113736-05
33	token_blacklist	0012_alter_outstandingtoken_user	2024-02-02 19:08:59.150351-05
34	ventas	0002_lead_fecha_asignacion_lead_fecha_desasignacion_and_more	2024-02-02 19:08:59.236409-05
35	ventas	0003_alter_desasignacionleadasesor_fecha_and_more	2024-02-02 19:08:59.455151-05
36	ventas	0004_alter_desasignacionleadasesor_fecha_and_more	2024-02-02 19:08:59.992127-05
37	ventas	0005_producto_reservado_alter_objecion_nombre	2024-02-02 19:13:31.807653-05
38	marketing	0002_alter_campania_fecha_actualizacion_and_more	2024-02-03 09:49:03.099051-05
39	ventas	0006_evento_objecion	2024-02-03 09:49:03.170892-05
\.


--
-- Data for Name: django_session; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.django_session (session_key, session_data, expire_date) FROM stdin;
ntmqletmj055sz73zvqdcag1ar2hyvv6	.eJxVjDsOwjAQBe_iGlmJPxtMSc8ZrPXuGgdQLMVJhbg7iZQC2jcz760irkuJa5M5jqwuyqjT75aQnjLtgB843aumOi3zmPSu6IM2fassr-vh_h0UbGWrM2SwAWhg7KUnSMkETBKQ0HhxwbD3uUMDwuAd58FuojvbICjUkajPFwyPOSQ:1rW3fY:iwv-eCz-USqkkt8iPbiJaOvDw_zyrZgAFjsYBUJEzmU	2024-02-16 19:14:04.992376-05
\.


--
-- Data for Name: marketing_categoria; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.marketing_categoria (id, nombre, estado_id) FROM stdin;
1	Fisico	A
2	Bolante	A
3	Facebook	A
4	Instagram	A
5	TikTok	A
6	Desconocido	A
\.


--
-- Data for Name: marketing_proyecto; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.marketing_proyecto (id, nombre, ubicacion, descripcion, fecha_creacion, fecha_actualizacion, estado_id, "usuarioActualizador_id", "usuarioCreador_id") FROM stdin;
1	Socabaya	Socabaya	Es un proyecto grandioso	2024-02-01 19:00:00-05	2024-02-03 09:48:42.387599-05	A	2	2
\.


--
-- Data for Name: marketing_campania; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.marketing_campania (id, nombre, codigo, fecha_creacion, fecha_estimada, fecha_cierre, coste_estimado, coste_real, descripcion, fecha_actualizacion, categoria_id, estado_id, proyecto_id, "usuarioActualizador_id", "usuarioCreador_id") FROM stdin;
1	Campaña Socabaya Fisico	campañasocabayafisico_fisico_2_1	2024-02-02 23:02:48.190934-05	2024-02-02	2024-02-29	1400	1400		2024-02-03 09:46:43.848069-05	1	A	1	2	2
\.


--
-- Data for Name: ventas_tipoproducto; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.ventas_tipoproducto (id, nombre, estado_id) FROM stdin;
1	Departamento	A
2	Lote	A
3	Cochera	A
4	Deposito	A
5	Condominio	A
\.


--
-- Data for Name: ventas_producto; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.ventas_producto (id, nombre, codigo, numero, area, fecha_creacion, fecha_actualizacion, estado_id, proyecto_id, tipo_id, "usuarioActualizador_id", "usuarioCreador_id", reservado) FROM stdin;
\.


--
-- Data for Name: multimedia_imagenproducto; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.multimedia_imagenproducto (id, imagen, producto_id) FROM stdin;
\.


--
-- Data for Name: multimedia_imagenproyecto; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.multimedia_imagenproyecto (id, imagen, proyecto_id) FROM stdin;
1	media/imagenes/IMG_20181122_113441123.jpg	1
2	media/imagenes/IMG_20190228_175636310.jpg	1
3	media/imagenes/IMG_20181124_180020.jpg	1
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
1	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcwNjkzNTAxMywiaWF0IjoxNzA2OTIwNjEzLCJqdGkiOiI4OGYxNTgxODAzNzI0OTVkOGEwNTk3NzdkYjQzN2IyOCIsInVzZXJfaWQiOjJ9._KdYgWJIrhPxUJSxZ_x4tcRL9GeiNilClefh2W07i5s	2024-02-02 19:36:53.77384-05	2024-02-02 23:36:53-05	2	88f158180372495d8a059777db437b28
2	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcwNjkzNTE0MywiaWF0IjoxNzA2OTIwNzQzLCJqdGkiOiI0ODM2ZWM5ZWMzYzU0NWU2YjM4OWJmNDdlMmM4NjhmNCIsInVzZXJfaWQiOjJ9.X_nzQwGn9wFAaW-knna_8zYTqTmr-h7usHjB6qFyiRE	2024-02-02 19:39:03.379661-05	2024-02-02 23:39:03-05	2	4836ec9ec3c545e6b389bf47e2c868f4
3	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcwNjkzNTE2MCwiaWF0IjoxNzA2OTIwNzYwLCJqdGkiOiJmOGM3MzU3MDM5YTc0MzY2OTlkZTUzOTFiOGQyMzA4OSIsInVzZXJfaWQiOjJ9.NZe3eR9m29ikvEmWdXrXYey8TfEwnruIoF4YCP80YCw	2024-02-02 19:39:20.007126-05	2024-02-02 23:39:20-05	2	f8c7357039a7436699de5391b8d23089
4	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcwNjkzNzQ1MywiaWF0IjoxNzA2OTIzMDUzLCJqdGkiOiJiMGNkMDIwZjM3NDU0YWY4ODNkMTI0Y2FmNWU0ZTA3MCIsInVzZXJfaWQiOjJ9.tlcU1hxQWNnP0yYYmz0XeQ5Kp8bPdTydqrj-1xMrDyA	2024-02-02 20:17:33.166702-05	2024-02-03 00:17:33-05	2	b0cd020f37454af883d124caf5e4e070
5	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcwNjkzODE4MSwiaWF0IjoxNzA2OTIzNzgxLCJqdGkiOiI1MWNkODEwZWYxN2Q0ZThlYWU0MDFmY2IyZDljM2M0MSIsInVzZXJfaWQiOjJ9.N66ndX-O9xSiE5aPQnPrR-vCF25gyfPXAmkhRv5KZBA	2024-02-02 20:29:41.908517-05	2024-02-03 00:29:41-05	2	51cd810ef17d4e8eae401fcb2d9c3c41
6	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcwNjk4MzE3MywiaWF0IjoxNzA2OTY4NzczLCJqdGkiOiIzYzFhODRhZDVhYjU0NTcyOGIwM2ExYTQ0ZjE3ODg2OSIsInVzZXJfaWQiOjJ9.ZeD-Jtz22E2sMuSfvMxQv8PuZIVN45hocDEAEWw3w5U	2024-02-03 08:59:33.164754-05	2024-02-03 12:59:33-05	2	3c1a84ad5ab545728b03a1a44f178869
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
1	Pago Contado	A
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
CA	Caliente	A
SE	Separaciones	A
CI	Cierre	A
\.


--
-- Data for Name: ventas_objecion; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.ventas_objecion (id, nombre, estado_id) FROM stdin;
1	Ninguna	A
2	No estoy interesado	A
3	Número equivocado	A
4	Muy caro	A
5	Yo les devuelvo la llamada	A
6	Vuélveme a llamar	A
7	La ubicación no me gusta	A
\.


--
-- Data for Name: ventas_lead; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.ventas_lead (id, nombre, apellido, asignado, celular, celular2, comentario, "horaRecepcion", llamar, "recienCreado", fecha_creacion, fecha_actualizacion, asesor_id, campania_id, estado_id, "estadoLead_id", objecion_id, "usuarioActualizador_id", "usuarioCreador_id", fecha_asignacion, fecha_desasignacion) FROM stdin;
\.


--
-- Data for Name: ventas_desasignacionleadasesor; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.ventas_desasignacionleadasesor (id, fecha, lead_id, usuario_id) FROM stdin;
\.


--
-- Data for Name: ventas_estadoevento; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.ventas_estadoevento (id, nombre, estado_id) FROM stdin;
1	Creado	A
2	En Proceso	A
3	Finalizado	A
\.


--
-- Data for Name: ventas_tipoevento; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.ventas_tipoevento (id, nombre, estado_id) FROM stdin;
1	Visita Campo	A
2	Visita Oficina	A
\.


--
-- Data for Name: ventas_evento; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.ventas_evento (id, titulo, duracion, fecha_visita, observacion, fecha_creacion, fecha_actualizacion, separado, asesor_id, estado_id, "estadoEvento_id", lead_id, tipo_id, "usuarioActualizador_id", "usuarioCreador_id", objecion_id) FROM stdin;
\.


--
-- Data for Name: ventas_historicoleadasesor; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.ventas_historicoleadasesor (id, fecha_creacion, lead_id, usuario_id) FROM stdin;
\.


--
-- Data for Name: ventas_llamada; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.ventas_llamada (id, detalle, contesto, fecha_creacion, fecha_actualizacion, estado_id, lead_id, objecion_id, "usuarioActualizador_id", "usuarioCreador_id", asesor_id) FROM stdin;
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
\.


--
-- Name: auth_group_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.auth_group_id_seq', 3, true);


--
-- Name: auth_group_permissions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.auth_group_permissions_id_seq', 32, true);


--
-- Name: auth_permission_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.auth_permission_id_seq', 140, true);


--
-- Name: cuenta_modulo_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.cuenta_modulo_id_seq', 7, true);


--
-- Name: cuenta_user_groups_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.cuenta_user_groups_id_seq', 3, true);


--
-- Name: cuenta_user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.cuenta_user_id_seq', 5, true);


--
-- Name: cuenta_user_user_permissions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.cuenta_user_user_permissions_id_seq', 1, false);


--
-- Name: django_admin_log_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.django_admin_log_id_seq', 12, true);


--
-- Name: django_content_type_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.django_content_type_id_seq', 35, true);


--
-- Name: django_migrations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.django_migrations_id_seq', 39, true);


--
-- Name: marketing_campania_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.marketing_campania_id_seq', 1, true);


--
-- Name: marketing_categoria_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.marketing_categoria_id_seq', 6, true);


--
-- Name: marketing_proyecto_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.marketing_proyecto_id_seq', 1, true);


--
-- Name: multimedia_imagenproducto_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.multimedia_imagenproducto_id_seq', 1, false);


--
-- Name: multimedia_imagenproyecto_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.multimedia_imagenproyecto_id_seq', 3, true);


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

SELECT pg_catalog.setval('public.token_blacklist_outstandingtoken_id_seq', 6, true);


--
-- Name: ventas_cotizacion_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.ventas_cotizacion_id_seq', 1, false);


--
-- Name: ventas_cuota_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.ventas_cuota_id_seq', 1, false);


--
-- Name: ventas_desasignacionleadasesor_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.ventas_desasignacionleadasesor_id_seq', 1, false);


--
-- Name: ventas_estadoevento_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.ventas_estadoevento_id_seq', 3, true);


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

SELECT pg_catalog.setval('public.ventas_objecion_id_seq', 7, true);


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

SELECT pg_catalog.setval('public.ventas_tipocuota_id_seq', 1, true);


--
-- Name: ventas_tipoevento_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.ventas_tipoevento_id_seq', 2, true);


--
-- Name: ventas_tipoproducto_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.ventas_tipoproducto_id_seq', 5, true);


--
-- Name: ventas_whatsapp_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.ventas_whatsapp_id_seq', 1, false);


--
-- PostgreSQL database dump complete
--

