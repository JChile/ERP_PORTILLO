--
-- PostgreSQL database dump
--

-- Dumped from database version 15.6
-- Dumped by pg_dump version 15.6

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
1	administrador
2	asesor
3	marketing
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
7	cuenta	user
8	cuenta	modulo
9	marketing	categoria
10	marketing	campania
11	marketing	presupuestoproyecto
12	marketing	gastocampania
13	marketing	proyecto
14	ventas	desasignacionconfiguracion
15	ventas	estadoevento
16	ventas	estadolead
17	ventas	lead
18	ventas	historicoleadasesor
19	ventas	desasignacionleadasesor
20	ventas	objecion
21	ventas	llamada
22	ventas	tipocotizacion
23	ventas	cotizacion
24	ventas	tipocuota
25	ventas	cuota
26	ventas	tipoevento
27	ventas	evento
28	ventas	tipoproducto
29	ventas	proyectotipoproducto
30	ventas	producto
31	ventas	precio
32	ventas	whatsapp
33	multimedia	imagenproducto
34	multimedia	imagenproyecto
35	multimedia	videoproducto
36	multimedia	videoproyecto
37	token_blacklist	blacklistedtoken
38	token_blacklist	outstandingtoken
39	django_celery_beat	crontabschedule
40	django_celery_beat	intervalschedule
41	django_celery_beat	periodictask
42	django_celery_beat	periodictasks
43	django_celery_beat	solarschedule
44	django_celery_beat	clockedschedule
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
25	Can add user	7	add_user
26	Can change user	7	change_user
27	Can delete user	7	delete_user
28	Can view user	7	view_user
29	Can add modulo	8	add_modulo
30	Can change modulo	8	change_modulo
31	Can delete modulo	8	delete_modulo
32	Can view modulo	8	view_modulo
33	Can add categoria	9	add_categoria
34	Can change categoria	9	change_categoria
35	Can delete categoria	9	delete_categoria
36	Can view categoria	9	view_categoria
37	Can add campania	10	add_campania
38	Can change campania	10	change_campania
39	Can delete campania	10	delete_campania
40	Can view campania	10	view_campania
41	Can add presupuesto proyecto	11	add_presupuestoproyecto
42	Can change presupuesto proyecto	11	change_presupuestoproyecto
43	Can delete presupuesto proyecto	11	delete_presupuestoproyecto
44	Can view presupuesto proyecto	11	view_presupuestoproyecto
45	Can add gasto campania	12	add_gastocampania
46	Can change gasto campania	12	change_gastocampania
47	Can delete gasto campania	12	delete_gastocampania
48	Can view gasto campania	12	view_gastocampania
49	Can add proyecto	13	add_proyecto
50	Can change proyecto	13	change_proyecto
51	Can delete proyecto	13	delete_proyecto
52	Can view proyecto	13	view_proyecto
53	Can add desasignacion configuracion	14	add_desasignacionconfiguracion
54	Can change desasignacion configuracion	14	change_desasignacionconfiguracion
55	Can delete desasignacion configuracion	14	delete_desasignacionconfiguracion
56	Can view desasignacion configuracion	14	view_desasignacionconfiguracion
57	Can add estado evento	15	add_estadoevento
58	Can change estado evento	15	change_estadoevento
59	Can delete estado evento	15	delete_estadoevento
60	Can view estado evento	15	view_estadoevento
61	Can add estado lead	16	add_estadolead
62	Can change estado lead	16	change_estadolead
63	Can delete estado lead	16	delete_estadolead
64	Can view estado lead	16	view_estadolead
65	Can add lead	17	add_lead
66	Can change lead	17	change_lead
67	Can delete lead	17	delete_lead
68	Can view lead	17	view_lead
69	Can add historico lead asesor	18	add_historicoleadasesor
70	Can change historico lead asesor	18	change_historicoleadasesor
71	Can delete historico lead asesor	18	delete_historicoleadasesor
72	Can view historico lead asesor	18	view_historicoleadasesor
73	Can add desasignacion lead asesor	19	add_desasignacionleadasesor
74	Can change desasignacion lead asesor	19	change_desasignacionleadasesor
75	Can delete desasignacion lead asesor	19	delete_desasignacionleadasesor
76	Can view desasignacion lead asesor	19	view_desasignacionleadasesor
77	Can add objecion	20	add_objecion
78	Can change objecion	20	change_objecion
79	Can delete objecion	20	delete_objecion
80	Can view objecion	20	view_objecion
81	Can add llamada	21	add_llamada
82	Can change llamada	21	change_llamada
83	Can delete llamada	21	delete_llamada
84	Can view llamada	21	view_llamada
85	Can add tipo cotizacion	22	add_tipocotizacion
86	Can change tipo cotizacion	22	change_tipocotizacion
87	Can delete tipo cotizacion	22	delete_tipocotizacion
88	Can view tipo cotizacion	22	view_tipocotizacion
89	Can add cotizacion	23	add_cotizacion
90	Can change cotizacion	23	change_cotizacion
91	Can delete cotizacion	23	delete_cotizacion
92	Can view cotizacion	23	view_cotizacion
93	Can add tipo cuota	24	add_tipocuota
94	Can change tipo cuota	24	change_tipocuota
95	Can delete tipo cuota	24	delete_tipocuota
96	Can view tipo cuota	24	view_tipocuota
97	Can add cuota	25	add_cuota
98	Can change cuota	25	change_cuota
99	Can delete cuota	25	delete_cuota
100	Can view cuota	25	view_cuota
101	Can add tipo evento	26	add_tipoevento
102	Can change tipo evento	26	change_tipoevento
103	Can delete tipo evento	26	delete_tipoevento
104	Can view tipo evento	26	view_tipoevento
105	Can add evento	27	add_evento
106	Can change evento	27	change_evento
107	Can delete evento	27	delete_evento
108	Can view evento	27	view_evento
109	Can add tipo producto	28	add_tipoproducto
110	Can change tipo producto	28	change_tipoproducto
111	Can delete tipo producto	28	delete_tipoproducto
112	Can view tipo producto	28	view_tipoproducto
113	Can add proyecto tipo producto	29	add_proyectotipoproducto
114	Can change proyecto tipo producto	29	change_proyectotipoproducto
115	Can delete proyecto tipo producto	29	delete_proyectotipoproducto
116	Can view proyecto tipo producto	29	view_proyectotipoproducto
117	Can add producto	30	add_producto
118	Can change producto	30	change_producto
119	Can delete producto	30	delete_producto
120	Can view producto	30	view_producto
121	Can add precio	31	add_precio
122	Can change precio	31	change_precio
123	Can delete precio	31	delete_precio
124	Can view precio	31	view_precio
125	Can add whats app	32	add_whatsapp
126	Can change whats app	32	change_whatsapp
127	Can delete whats app	32	delete_whatsapp
128	Can view whats app	32	view_whatsapp
129	Can add imagen producto	33	add_imagenproducto
130	Can change imagen producto	33	change_imagenproducto
131	Can delete imagen producto	33	delete_imagenproducto
132	Can view imagen producto	33	view_imagenproducto
133	Can add imagen proyecto	34	add_imagenproyecto
134	Can change imagen proyecto	34	change_imagenproyecto
135	Can delete imagen proyecto	34	delete_imagenproyecto
136	Can view imagen proyecto	34	view_imagenproyecto
137	Can add video producto	35	add_videoproducto
138	Can change video producto	35	change_videoproducto
139	Can delete video producto	35	delete_videoproducto
140	Can view video producto	35	view_videoproducto
141	Can add video proyecto	36	add_videoproyecto
142	Can change video proyecto	36	change_videoproyecto
143	Can delete video proyecto	36	delete_videoproyecto
144	Can view video proyecto	36	view_videoproyecto
145	Can add blacklisted token	37	add_blacklistedtoken
146	Can change blacklisted token	37	change_blacklistedtoken
147	Can delete blacklisted token	37	delete_blacklistedtoken
148	Can view blacklisted token	37	view_blacklistedtoken
149	Can add outstanding token	38	add_outstandingtoken
150	Can change outstanding token	38	change_outstandingtoken
151	Can delete outstanding token	38	delete_outstandingtoken
152	Can view outstanding token	38	view_outstandingtoken
153	Can add crontab	39	add_crontabschedule
154	Can change crontab	39	change_crontabschedule
155	Can delete crontab	39	delete_crontabschedule
156	Can view crontab	39	view_crontabschedule
157	Can add interval	40	add_intervalschedule
158	Can change interval	40	change_intervalschedule
159	Can delete interval	40	delete_intervalschedule
160	Can view interval	40	view_intervalschedule
161	Can add periodic task	41	add_periodictask
162	Can change periodic task	41	change_periodictask
163	Can delete periodic task	41	delete_periodictask
164	Can view periodic task	41	view_periodictask
165	Can add periodic tasks	42	add_periodictasks
166	Can change periodic tasks	42	change_periodictasks
167	Can delete periodic tasks	42	delete_periodictasks
168	Can view periodic tasks	42	view_periodictasks
169	Can add solar event	43	add_solarschedule
170	Can change solar event	43	change_solarschedule
171	Can delete solar event	43	delete_solarschedule
172	Can view solar event	43	view_solarschedule
173	Can add clocked	44	add_clockedschedule
174	Can change clocked	44	change_clockedschedule
175	Can delete clocked	44	delete_clockedschedule
176	Can view clocked	44	view_clockedschedule
\.


--
-- Data for Name: auth_group_permissions; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.auth_group_permissions (id, group_id, permission_id) FROM stdin;
1	1	9
2	1	10
3	1	11
4	1	12
5	1	25
6	1	26
7	1	27
8	1	28
9	1	37
10	1	38
11	1	39
12	1	40
13	1	49
14	1	50
15	1	51
16	1	52
17	1	65
18	1	66
19	1	67
20	1	68
21	1	105
22	1	106
23	1	107
24	1	108
25	1	117
26	1	118
27	1	119
28	1	120
29	2	65
30	2	66
31	2	67
32	2	68
33	2	105
34	2	106
35	2	107
36	2	108
37	3	65
38	3	66
39	3	67
40	3	68
41	3	37
42	3	38
43	3	39
44	3	40
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
1	Gestion de campañas	campania	10	A
2	Gestión de proyectos	proyecto	13	A
3	Gestion de roles	rol	3	A
4	Gestión de productos	producto	30	A
5	Gestión de leads	lead	17	A
6	Gestion de eventos	evento	27	A
7	Gestion de usuarios	usuario	7	A
\.


--
-- Data for Name: cuenta_user; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.cuenta_user (id, password, last_login, is_superuser, username, first_name, last_name, email, is_staff, is_active, date_joined, "codigoAsesor", "isAdmin", estado_id) FROM stdin;
1	pbkdf2_sha256$720000$6Y6rmQfczASvvYY73qP5o7$hgA2enkDd/u/Tdaujlpx/QupWa8KF8OhlHrwyZuOdJY=	\N	t	portilloAdmin	Administrador Portillo			t	t	2024-03-13 14:32:31.188181-05	\N	f	A
2	pbkdf2_sha256$720000$wx1MyiZVJR9Irwdh2IKOcI$CfAVVA8hxHUO617nmkCFU2BwugVDEne1hnrWgajLors=	\N	f	rony	Rony	Ventura	rony0025_sector51@hotmail.com	f	t	2024-03-13 16:20:42.717657-05	\N	t	A
\.


--
-- Data for Name: cuenta_user_groups; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.cuenta_user_groups (id, user_id, group_id) FROM stdin;
1	1	1
2	2	3
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
-- Data for Name: django_celery_beat_clockedschedule; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.django_celery_beat_clockedschedule (id, clocked_time) FROM stdin;
\.


--
-- Data for Name: django_celery_beat_crontabschedule; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.django_celery_beat_crontabschedule (id, minute, hour, day_of_week, day_of_month, month_of_year, timezone) FROM stdin;
\.


--
-- Data for Name: django_celery_beat_intervalschedule; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.django_celery_beat_intervalschedule (id, every, period) FROM stdin;
\.


--
-- Data for Name: django_celery_beat_solarschedule; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.django_celery_beat_solarschedule (id, event, latitude, longitude) FROM stdin;
\.


--
-- Data for Name: django_celery_beat_periodictask; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.django_celery_beat_periodictask (id, name, task, args, kwargs, queue, exchange, routing_key, expires, enabled, last_run_at, total_run_count, date_changed, description, crontab_id, interval_id, solar_id, one_off, start_time, priority, headers, clocked_id, expire_seconds) FROM stdin;
\.


--
-- Data for Name: django_celery_beat_periodictasks; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.django_celery_beat_periodictasks (ident, last_update) FROM stdin;
\.


--
-- Data for Name: django_migrations; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.django_migrations (id, app, name, applied) FROM stdin;
1	contenttypes	0001_initial	2024-03-13 14:32:28.062587-05
2	contenttypes	0002_remove_content_type_name	2024-03-13 14:32:28.076161-05
3	auth	0001_initial	2024-03-13 14:32:28.124831-05
4	auth	0002_alter_permission_name_max_length	2024-03-13 14:32:28.127232-05
5	auth	0003_alter_user_email_max_length	2024-03-13 14:32:28.131925-05
6	auth	0004_alter_user_username_opts	2024-03-13 14:32:28.139943-05
7	auth	0005_alter_user_last_login_null	2024-03-13 14:32:28.146312-05
8	auth	0006_require_contenttypes_0002	2024-03-13 14:32:28.147853-05
9	auth	0007_alter_validators_add_error_messages	2024-03-13 14:32:28.150553-05
10	auth	0008_alter_user_username_max_length	2024-03-13 14:32:28.158435-05
11	auth	0009_alter_user_last_name_max_length	2024-03-13 14:32:28.161424-05
12	auth	0010_alter_group_name_max_length	2024-03-13 14:32:28.176591-05
13	auth	0011_update_proxy_permissions	2024-03-13 14:32:28.186595-05
14	auth	0012_alter_user_first_name_max_length	2024-03-13 14:32:28.193219-05
15	cuenta	0001_initial	2024-03-13 14:32:28.258721-05
16	admin	0001_initial	2024-03-13 14:32:28.325103-05
17	admin	0002_logentry_remove_auto_add	2024-03-13 14:32:28.328415-05
18	admin	0003_logentry_add_action_flag_choices	2024-03-13 14:32:28.34591-05
19	django_celery_beat	0001_initial	2024-03-13 14:32:28.378121-05
20	django_celery_beat	0002_auto_20161118_0346	2024-03-13 14:32:28.39382-05
21	django_celery_beat	0003_auto_20161209_0049	2024-03-13 14:32:28.402316-05
22	django_celery_beat	0004_auto_20170221_0000	2024-03-13 14:32:28.404966-05
23	django_celery_beat	0005_add_solarschedule_events_choices	2024-03-13 14:32:28.409233-05
24	django_celery_beat	0006_auto_20180322_0932	2024-03-13 14:32:28.439236-05
25	django_celery_beat	0007_auto_20180521_0826	2024-03-13 14:32:28.452851-05
26	django_celery_beat	0008_auto_20180914_1922	2024-03-13 14:32:28.473546-05
27	django_celery_beat	0006_auto_20180210_1226	2024-03-13 14:32:28.489149-05
28	django_celery_beat	0006_periodictask_priority	2024-03-13 14:32:28.499295-05
29	django_celery_beat	0009_periodictask_headers	2024-03-13 14:32:28.505879-05
30	django_celery_beat	0010_auto_20190429_0326	2024-03-13 14:32:28.645292-05
31	django_celery_beat	0011_auto_20190508_0153	2024-03-13 14:32:28.685833-05
32	django_celery_beat	0012_periodictask_expire_seconds	2024-03-13 14:32:28.70656-05
33	django_celery_beat	0013_auto_20200609_0727	2024-03-13 14:32:28.713006-05
34	django_celery_beat	0014_remove_clockedschedule_enabled	2024-03-13 14:32:28.722262-05
35	django_celery_beat	0015_edit_solarschedule_events_choices	2024-03-13 14:32:28.725459-05
36	django_celery_beat	0016_alter_crontabschedule_timezone	2024-03-13 14:32:28.730817-05
37	django_celery_beat	0017_alter_crontabschedule_month_of_year	2024-03-13 14:32:28.740336-05
38	django_celery_beat	0018_improve_crontab_helptext	2024-03-13 14:32:28.747674-05
39	marketing	0001_initial	2024-03-13 14:32:28.938479-05
40	ventas	0001_initial	2024-03-13 14:32:29.671175-05
41	multimedia	0001_initial	2024-03-13 14:32:29.823136-05
42	sessions	0001_initial	2024-03-13 14:32:29.826778-05
43	token_blacklist	0001_initial	2024-03-13 14:32:29.94313-05
44	token_blacklist	0002_outstandingtoken_jti_hex	2024-03-13 14:32:29.969135-05
45	token_blacklist	0003_auto_20171017_2007	2024-03-13 14:32:30.007581-05
46	token_blacklist	0004_auto_20171017_2013	2024-03-13 14:32:30.034033-05
47	token_blacklist	0005_remove_outstandingtoken_jti	2024-03-13 14:32:30.054956-05
48	token_blacklist	0006_auto_20171017_2113	2024-03-13 14:32:30.077952-05
49	token_blacklist	0007_auto_20171017_2214	2024-03-13 14:32:30.193943-05
50	token_blacklist	0008_migrate_to_bigautofield	2024-03-13 14:32:30.296338-05
51	token_blacklist	0010_fix_migrate_to_bigautofield	2024-03-13 14:32:30.340007-05
52	token_blacklist	0011_linearizes_history	2024-03-13 14:32:30.340007-05
53	token_blacklist	0012_alter_outstandingtoken_user	2024-03-13 14:32:30.370944-05
\.


--
-- Data for Name: django_session; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.django_session (session_key, session_data, expire_date) FROM stdin;
\.


--
-- Data for Name: marketing_categoria; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.marketing_categoria (id, nombre, codigo, estado_id) FROM stdin;
1	Fisico	CF	A
2	Volante	CV	A
3	Facebook	CFB	A
4	Instagram	CI	A
5	TikTok	CT	A
6	WhatsApp	CW	A
7	Desconocido	CD	A
\.


--
-- Data for Name: marketing_proyecto; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.marketing_proyecto (id, nombre, ubicacion, codigo, descripcion, fecha_creacion, fecha_actualizacion, estado_id, "usuarioActualizador_id", "usuarioCreador_id") FROM stdin;
1	Alamos	Socabaya	ASC123	Ninguna	2024-03-13 16:28:33.438212-05	2024-03-13 16:28:33.438716-05	A	\N	1
\.


--
-- Data for Name: marketing_campania; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.marketing_campania (id, nombre, organico, codigo, fecha_estimada, fecha_cierre, "coste_realSoles", "coste_realDolares", descripcion, fecha_creacion, fecha_actualizacion, estado_id, "usuarioActualizador_id", "usuarioCreador_id", categoria_id, proyecto_id) FROM stdin;
1	Alamos_organico	f	Alamos_organico	\N	\N	0	0	\N	2024-03-13 16:28:33.441655-05	2024-03-13 16:28:33.441655-05	A	\N	\N	7	1
\.


--
-- Data for Name: marketing_presupuestoproyecto; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.marketing_presupuestoproyecto (id, "presupuestoSoles", "gastoTotalCampaniasSoles", "presupuestoDolares", "gastoTotalCampaniasDolares", "tipoCambioSoles", "fechaPresupuesto", fecha_creacion, fecha_actualizacion, estado_id, "usuarioActualizador_id", "usuarioCreador_id", proyecto_id) FROM stdin;
\.


--
-- Data for Name: marketing_gastocampania; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.marketing_gastocampania (id, "gastoSoles", "gastoDolares", "tipoCambioSoles", "fechaGasto", fecha_creacion, fecha_actualizacion, campania_id, estado_id, "usuarioActualizador_id", "usuarioCreador_id", "presupuestoProyecto_id") FROM stdin;
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

COPY public.ventas_producto (id, nombre, codigo, reservado, numero, area, fecha_creacion, fecha_actualizacion, estado_id, proyecto_id, "usuarioActualizador_id", "usuarioCreador_id", tipo_id) FROM stdin;
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
1	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcxMDM3OTE3MywiaWF0IjoxNzEwMzY0NzczLCJqdGkiOiIzNTAwM2FlOGI0YWQ0MDQ3YjBmZDIzNmZmYjdjNWI1ZiIsInVzZXJfaWQiOjF9.sdTVW3I5SC9q3wkIp3fXPL-m8iPkJdXrGHPfXiZw5e4	2024-03-13 16:19:33.287882-05	2024-03-13 20:19:33-05	1	35003ae8b4ad4047b0fd236ffb7c5b5f
2	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcxMDM3OTM3NiwiaWF0IjoxNzEwMzY0OTc2LCJqdGkiOiIzMjgzYjk4MWY4YWQ0NDdhODM2NzYzYjAzNGFmM2E5MyIsInVzZXJfaWQiOjJ9.1jzG3EI1XN8ZYj8BwoKkP-X-rEPqljtdM6mvWdGQaVs	2024-03-13 16:22:56.576967-05	2024-03-13 20:22:56-05	2	3283b981f8ad447a836763b034af3a93
3	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcxMDM3OTM5MCwiaWF0IjoxNzEwMzY0OTkwLCJqdGkiOiJmMjc3NDNjOTQ3MzM0Nzk0OWM0YmRjZmY3MjQyOTIyYSIsInVzZXJfaWQiOjF9.KklnKMDvvsJ1aNKfkMSCzx-a8WAoorfSAT024uY6gzM	2024-03-13 16:23:10.774848-05	2024-03-13 20:23:10-05	1	f27743c9473347949c4bdcff7242922a
4	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcxMDM3OTc0OSwiaWF0IjoxNzEwMzY1MzQ5LCJqdGkiOiIzZTY1Nzc5NjcyYzU0MGQ2YmU4OWUwOTQ3ZDliNmIyMSIsInVzZXJfaWQiOjJ9.1LOKFgAc32WU4otWckAt3yCAv3ZFLnN3v3iD83Zj3bA	2024-03-13 16:29:09.370362-05	2024-03-13 20:29:09-05	2	3e65779672c540d6be89e0947d9b6b21
5	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcxMDM4MzY0NSwiaWF0IjoxNzEwMzY5MjQ1LCJqdGkiOiI3NjY3NzM4NzZhNWI0Y2U5YTZhYTQxODc3ODQ1MDBhNCIsInVzZXJfaWQiOjJ9.pDZ_RlC_6jMmY7fp8BgE3tMJT_LvcgDjaF7-JxzfJuE	2024-03-13 17:34:05.794702-05	2024-03-13 21:34:05-05	2	766773876a5b4ce9a6aa4187784500a4
6	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcxMDQ4NTU2OCwiaWF0IjoxNzEwNDcxMTY4LCJqdGkiOiI4N2FlZTMwOTcyZjA0NzkwYjA4ZjkwZjQ0OTQ2YWJjMCIsInVzZXJfaWQiOjJ9.Fr7hMV2dhu--OsTeoe3AaQCAaLeoSjZpwu0foXObAJo	2024-03-14 21:52:48.973041-05	2024-03-15 01:52:48-05	2	87aee30972f04790b08f90f44946abc0
7	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcxMDQ5MTQwMCwiaWF0IjoxNzEwNDc3MDAwLCJqdGkiOiJiMGVlYTkwZjY2NTE0YTY1YWFhMTA0MGRmOTAyNzg2MCIsInVzZXJfaWQiOjJ9.LuUB026ggQcFDk_UVMLNNyov_xFZfAG2bv9Tg3tTf0E	2024-03-14 23:30:00.535335-05	2024-03-15 03:30:00-05	2	b0eea90f66514a65aaa1040df9027860
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
-- Data for Name: ventas_desasignacionconfiguracion; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.ventas_desasignacionconfiguracion (id, rango) FROM stdin;
\.


--
-- Data for Name: ventas_estadolead; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.ventas_estadolead (nombre, descripcion, color, estado_id) FROM stdin;
NR	No responde	#949494	A
EP	En proceso	#949494	A
FR	Frio	#0044FF	A
TB	Tibio	#FFEE00	A
CA	Caliente	#FF0000	A
SE	Separaciones	#949494	A
CI	Cierre	#19FF00	A
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

COPY public.ventas_lead (id, nombre, apellido, asignado, celular, celular2, comentario, "horaRecepcion", llamar, importante, fecha_asignacion, fecha_desasignacion, "recienCreado", fecha_creacion, fecha_actualizacion, asesor_id, campania_id, estado_id, "estadoLead_id", "usuarioActualizador_id", "usuarioCreador_id", objecion_id) FROM stdin;
\.


--
-- Data for Name: ventas_desasignacionleadasesor; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.ventas_desasignacionleadasesor (id, fecha, usuario_id, lead_id) FROM stdin;
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

COPY public.ventas_evento (id, titulo, duracion, fecha_visita, observacion, fecha_creacion, fecha_actualizacion, separado, asesor_id, estado_id, "estadoEvento_id", "usuarioActualizador_id", "usuarioCreador_id", lead_id, objecion_id, tipo_id) FROM stdin;
\.


--
-- Data for Name: ventas_historicoleadasesor; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.ventas_historicoleadasesor (id, fecha_creacion, usuario_id, lead_id) FROM stdin;
\.


--
-- Data for Name: ventas_llamada; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.ventas_llamada (id, detalle, contesto, fecha_creacion, fecha_actualizacion, asesor_id, estado_id, lead_id, "usuarioActualizador_id", "usuarioCreador_id", objecion_id) FROM stdin;
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

COPY public.ventas_whatsapp (id, detalle, respondio, fecha_creacion, fecha_actualizacion, asesor_id, estado_id, lead_id, objecion_id, "usuarioActualizador_id", "usuarioCreador_id") FROM stdin;
\.


--
-- Name: auth_group_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.auth_group_id_seq', 3, true);


--
-- Name: auth_group_permissions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.auth_group_permissions_id_seq', 44, true);


--
-- Name: auth_permission_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.auth_permission_id_seq', 176, true);


--
-- Name: cuenta_modulo_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.cuenta_modulo_id_seq', 7, true);


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
-- Name: django_celery_beat_clockedschedule_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.django_celery_beat_clockedschedule_id_seq', 1, false);


--
-- Name: django_celery_beat_crontabschedule_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.django_celery_beat_crontabschedule_id_seq', 1, false);


--
-- Name: django_celery_beat_intervalschedule_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.django_celery_beat_intervalschedule_id_seq', 1, false);


--
-- Name: django_celery_beat_periodictask_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.django_celery_beat_periodictask_id_seq', 1, false);


--
-- Name: django_celery_beat_solarschedule_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.django_celery_beat_solarschedule_id_seq', 1, false);


--
-- Name: django_content_type_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.django_content_type_id_seq', 44, true);


--
-- Name: django_migrations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.django_migrations_id_seq', 53, true);


--
-- Name: marketing_campania_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.marketing_campania_id_seq', 1, true);


--
-- Name: marketing_categoria_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.marketing_categoria_id_seq', 7, true);


--
-- Name: marketing_gastocampania_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.marketing_gastocampania_id_seq', 1, false);


--
-- Name: marketing_presupuestoproyecto_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.marketing_presupuestoproyecto_id_seq', 1, false);


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

SELECT pg_catalog.setval('public.multimedia_imagenproyecto_id_seq', 1, false);


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

SELECT pg_catalog.setval('public.token_blacklist_outstandingtoken_id_seq', 7, true);


--
-- Name: ventas_cotizacion_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.ventas_cotizacion_id_seq', 1, false);


--
-- Name: ventas_cuota_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.ventas_cuota_id_seq', 1, false);


--
-- Name: ventas_desasignacionconfiguracion_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.ventas_desasignacionconfiguracion_id_seq', 1, false);


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

