--
-- PostgreSQL database dump
--

-- Dumped from database version 14.11 (Ubuntu 14.11-0ubuntu0.22.04.1)
-- Dumped by pg_dump version 14.11 (Ubuntu 14.11-0ubuntu0.22.04.1)

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
7	cuenta	modulo
8	cuenta	user
9	marketing	campania
10	marketing	proyecto
11	marketing	presupuestoproyecto
12	marketing	gastocampania
13	marketing	categoria
14	ventas	cotizacion
15	ventas	desasignacionconfiguracion
16	ventas	estadoevento
17	ventas	estadolead
18	ventas	lead
19	ventas	objecion
20	ventas	whatsapp
21	ventas	tipoproducto
22	ventas	tipoevento
23	ventas	tipocuota
24	ventas	tipocotizacion
25	ventas	proyectotipoproducto
26	ventas	producto
27	ventas	precio
28	ventas	llamada
29	ventas	historicoleadasesor
30	ventas	evento
31	ventas	desasignacionleadasesor
32	ventas	cuota
33	multimedia	videoproyecto
34	multimedia	videoproducto
35	multimedia	imagenproyecto
36	multimedia	imagenproducto
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
25	Can add modulo	7	add_modulo
26	Can change modulo	7	change_modulo
27	Can delete modulo	7	delete_modulo
28	Can view modulo	7	view_modulo
29	Can add user	8	add_user
30	Can change user	8	change_user
31	Can delete user	8	delete_user
32	Can view user	8	view_user
33	Can add campania	9	add_campania
34	Can change campania	9	change_campania
35	Can delete campania	9	delete_campania
36	Can view campania	9	view_campania
37	Can add proyecto	10	add_proyecto
38	Can change proyecto	10	change_proyecto
39	Can delete proyecto	10	delete_proyecto
40	Can view proyecto	10	view_proyecto
41	Can add presupuesto proyecto	11	add_presupuestoproyecto
42	Can change presupuesto proyecto	11	change_presupuestoproyecto
43	Can delete presupuesto proyecto	11	delete_presupuestoproyecto
44	Can view presupuesto proyecto	11	view_presupuestoproyecto
45	Can add gasto campania	12	add_gastocampania
46	Can change gasto campania	12	change_gastocampania
47	Can delete gasto campania	12	delete_gastocampania
48	Can view gasto campania	12	view_gastocampania
49	Can add categoria	13	add_categoria
50	Can change categoria	13	change_categoria
51	Can delete categoria	13	delete_categoria
52	Can view categoria	13	view_categoria
53	Can add cotizacion	14	add_cotizacion
54	Can change cotizacion	14	change_cotizacion
55	Can delete cotizacion	14	delete_cotizacion
56	Can view cotizacion	14	view_cotizacion
57	Can add desasignacion configuracion	15	add_desasignacionconfiguracion
58	Can change desasignacion configuracion	15	change_desasignacionconfiguracion
59	Can delete desasignacion configuracion	15	delete_desasignacionconfiguracion
60	Can view desasignacion configuracion	15	view_desasignacionconfiguracion
61	Can add estado evento	16	add_estadoevento
62	Can change estado evento	16	change_estadoevento
63	Can delete estado evento	16	delete_estadoevento
64	Can view estado evento	16	view_estadoevento
65	Can add estado lead	17	add_estadolead
66	Can change estado lead	17	change_estadolead
67	Can delete estado lead	17	delete_estadolead
68	Can view estado lead	17	view_estadolead
69	Can add lead	18	add_lead
70	Can change lead	18	change_lead
71	Can delete lead	18	delete_lead
72	Can view lead	18	view_lead
73	Can add objecion	19	add_objecion
74	Can change objecion	19	change_objecion
75	Can delete objecion	19	delete_objecion
76	Can view objecion	19	view_objecion
77	Can add whats app	20	add_whatsapp
78	Can change whats app	20	change_whatsapp
79	Can delete whats app	20	delete_whatsapp
80	Can view whats app	20	view_whatsapp
81	Can add tipo producto	21	add_tipoproducto
82	Can change tipo producto	21	change_tipoproducto
83	Can delete tipo producto	21	delete_tipoproducto
84	Can view tipo producto	21	view_tipoproducto
85	Can add tipo evento	22	add_tipoevento
86	Can change tipo evento	22	change_tipoevento
87	Can delete tipo evento	22	delete_tipoevento
88	Can view tipo evento	22	view_tipoevento
89	Can add tipo cuota	23	add_tipocuota
90	Can change tipo cuota	23	change_tipocuota
91	Can delete tipo cuota	23	delete_tipocuota
92	Can view tipo cuota	23	view_tipocuota
93	Can add tipo cotizacion	24	add_tipocotizacion
94	Can change tipo cotizacion	24	change_tipocotizacion
95	Can delete tipo cotizacion	24	delete_tipocotizacion
96	Can view tipo cotizacion	24	view_tipocotizacion
97	Can add proyecto tipo producto	25	add_proyectotipoproducto
98	Can change proyecto tipo producto	25	change_proyectotipoproducto
99	Can delete proyecto tipo producto	25	delete_proyectotipoproducto
100	Can view proyecto tipo producto	25	view_proyectotipoproducto
101	Can add producto	26	add_producto
102	Can change producto	26	change_producto
103	Can delete producto	26	delete_producto
104	Can view producto	26	view_producto
105	Can add precio	27	add_precio
106	Can change precio	27	change_precio
107	Can delete precio	27	delete_precio
108	Can view precio	27	view_precio
109	Can add llamada	28	add_llamada
110	Can change llamada	28	change_llamada
111	Can delete llamada	28	delete_llamada
112	Can view llamada	28	view_llamada
113	Can add historico lead asesor	29	add_historicoleadasesor
114	Can change historico lead asesor	29	change_historicoleadasesor
115	Can delete historico lead asesor	29	delete_historicoleadasesor
116	Can view historico lead asesor	29	view_historicoleadasesor
117	Can add evento	30	add_evento
118	Can change evento	30	change_evento
119	Can delete evento	30	delete_evento
120	Can view evento	30	view_evento
121	Can add desasignacion lead asesor	31	add_desasignacionleadasesor
122	Can change desasignacion lead asesor	31	change_desasignacionleadasesor
123	Can delete desasignacion lead asesor	31	delete_desasignacionleadasesor
124	Can view desasignacion lead asesor	31	view_desasignacionleadasesor
125	Can add cuota	32	add_cuota
126	Can change cuota	32	change_cuota
127	Can delete cuota	32	delete_cuota
128	Can view cuota	32	view_cuota
129	Can add video proyecto	33	add_videoproyecto
130	Can change video proyecto	33	change_videoproyecto
131	Can delete video proyecto	33	delete_videoproyecto
132	Can view video proyecto	33	view_videoproyecto
133	Can add video producto	34	add_videoproducto
134	Can change video producto	34	change_videoproducto
135	Can delete video producto	34	delete_videoproducto
136	Can view video producto	34	view_videoproducto
137	Can add imagen proyecto	35	add_imagenproyecto
138	Can change imagen proyecto	35	change_imagenproyecto
139	Can delete imagen proyecto	35	delete_imagenproyecto
140	Can view imagen proyecto	35	view_imagenproyecto
141	Can add imagen producto	36	add_imagenproducto
142	Can change imagen producto	36	change_imagenproducto
143	Can delete imagen producto	36	delete_imagenproducto
144	Can view imagen producto	36	view_imagenproducto
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
5	1	29
6	1	30
7	1	31
8	1	32
9	1	33
10	1	34
11	1	35
12	1	36
13	1	37
14	1	38
15	1	39
16	1	40
17	1	69
18	1	70
19	1	71
20	1	72
21	1	101
22	1	102
23	1	103
24	1	104
25	1	117
26	1	118
27	1	119
28	1	120
29	2	69
30	2	70
31	2	71
32	2	72
33	2	117
34	2	118
35	2	119
36	2	120
37	3	33
38	3	34
39	3	35
40	3	36
41	3	69
42	3	70
43	3	71
44	3	72
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
1	Gestion de campañas	campania	9	A
2	Gestión de proyectos	proyecto	10	A
3	Gestion de roles	rol	3	A
4	Gestión de productos	producto	26	A
5	Gestión de leads	lead	18	A
6	Gestion de eventos	evento	30	A
7	Gestion de usuarios	usuario	8	A
\.


--
-- Data for Name: cuenta_user; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.cuenta_user (id, password, last_login, is_superuser, username, first_name, last_name, email, is_staff, is_active, date_joined, "codigoAsesor", "isAdmin", estado_id) FROM stdin;
1	pbkdf2_sha256$600000$Cy2NkGRPw3gxcv5mKZjofi$uJQTaXx0w9wpvUoWDMnJtt9MbWNh5VeOxsvYopC6sr4=	2024-03-14 19:14:23.789075-05	t	portilloAdmin	Administrador Portillo			t	t	2024-03-14 19:12:44.911934-05	\N	f	A
2	pbkdf2_sha256$600000$Uvgdc4yXWzFxjDkrtysYRH$eBboVj7h1rD+k5V/H1JXAvewuzFRgGZm6Cuq6Nk0cU4=	\N	f	asesor1	asesor uno	asesor uno	bgomezv@unsa.edu.pe	f	t	2024-03-14 19:35:32.250363-05	asesor_a	f	A
3	pbkdf2_sha256$600000$CMHgOBqTWJUM5i1fTABYvq$1CR47Ca5ZZWDW1EZSJrLk2v3pt95cdZs5rc8K1YQe4E=	\N	f	marketing1	marketing uno	marketing uno	josephgvalfa@gmail.com	f	t	2024-03-14 19:37:29.051515-05	\N	t	A
4	pbkdf2_sha256$600000$cxkHVl7NkdYcsTUt5Sy6QU$Jq9tC2M23AdJn2IRQZFccP9i1T2foC/iL1H04is9eUY=	\N	f	asesor2	asesor	dos	karengv2006@gmail.com	f	t	2024-03-14 19:38:43.997997-05	asesor_b	t	A
5	pbkdf2_sha256$600000$Jp95oa2pzHO7l7kFx8mzaK$eJcVGMxvz2e9KxiFByfhtt6iOJ7z2ELPCLfXK1FkNIA=	\N	f	asesor3	asesor	tres	josephgvalfa@gmail.com	f	t	2024-03-14 19:39:29.537-05	asesor_c	t	A
\.


--
-- Data for Name: cuenta_user_groups; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.cuenta_user_groups (id, user_id, group_id) FROM stdin;
1	1	1
2	2	2
3	3	3
4	4	2
5	5	2
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
1	2024-03-14 20:33:45.486746-05	17	943702641	3		18	1
2	2024-03-14 20:33:45.492547-05	16	Maria-952784659	3		18	1
3	2024-03-14 20:33:45.494053-05	15	Luis-921840124	3		18	1
4	2024-03-14 20:33:45.495752-05	14	Solange-aaa	3		18	1
5	2024-03-14 20:33:45.497813-05	13	Carlos-98313aaa4136	3		18	1
6	2024-03-14 20:33:45.499138-05	12	Andrew-934853123a	3		18	1
7	2024-03-14 20:33:45.500423-05	11	936485732	3		18	1
8	2024-03-14 20:33:45.501724-05	10	944857396	3		18	1
9	2024-03-14 20:33:45.502925-05	9	Samuel-913949511	3		18	1
10	2024-03-14 20:33:45.504065-05	8	Percy-911249144	3		18	1
11	2024-03-14 20:33:45.505484-05	7	Miguel-911393941	3		18	1
12	2024-03-14 20:33:45.506643-05	6	983123832	3		18	1
13	2024-03-14 20:33:45.507868-05	5	Juan-98732341	3		18	1
14	2024-03-14 20:33:45.508976-05	4	Solange-970455267	3		18	1
15	2024-03-14 20:33:45.510129-05	3	Carlos-983134136	3		18	1
16	2024-03-14 20:33:45.511364-05	2	Andrew-934853123	3		18	1
17	2024-03-14 20:33:45.512494-05	1	Jose-915465876	3		18	1
18	2024-03-14 20:44:00.551935-05	32	935749102	3		18	1
19	2024-03-14 20:44:00.557893-05	31	936485732	3		18	1
20	2024-03-14 20:44:00.55952-05	30	944857396	3		18	1
21	2024-03-14 20:44:00.560959-05	29	943702641	3		18	1
22	2024-03-14 20:44:00.562725-05	28	Maria-952784659	3		18	1
23	2024-03-14 20:44:00.565473-05	27	Luis-921840124	3		18	1
24	2024-03-14 20:44:00.567537-05	26	Samuel-913949511	3		18	1
25	2024-03-14 20:44:00.569678-05	25	Percy-911249144	3		18	1
26	2024-03-14 20:44:00.570929-05	24	Miguel-911393941	3		18	1
27	2024-03-14 20:44:00.572154-05	23	983123832	3		18	1
28	2024-03-14 20:44:00.573478-05	22	Juan-98732341	3		18	1
29	2024-03-14 20:44:00.574715-05	21	Solange-aaa	3		18	1
30	2024-03-14 20:44:00.575983-05	20	Carlos-98313aaa4136	3		18	1
31	2024-03-14 20:44:00.577161-05	19	Andrew-934853123a	3		18	1
32	2024-03-14 20:44:00.578543-05	18	Jose-915465876	3		18	1
33	2024-03-14 22:31:35.091064-05	35	Carlos-983139696	2	[{"changed": {"fields": ["Asignado", "Asesor"]}}]	18	1
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
1	contenttypes	0001_initial	2024-03-14 19:12:41.925492-05
2	contenttypes	0002_remove_content_type_name	2024-03-14 19:12:41.933043-05
3	auth	0001_initial	2024-03-14 19:12:41.971975-05
4	auth	0002_alter_permission_name_max_length	2024-03-14 19:12:41.978395-05
5	auth	0003_alter_user_email_max_length	2024-03-14 19:12:41.984862-05
6	auth	0004_alter_user_username_opts	2024-03-14 19:12:41.99106-05
7	auth	0005_alter_user_last_login_null	2024-03-14 19:12:41.999785-05
8	auth	0006_require_contenttypes_0002	2024-03-14 19:12:42.002497-05
9	auth	0007_alter_validators_add_error_messages	2024-03-14 19:12:42.008982-05
10	auth	0008_alter_user_username_max_length	2024-03-14 19:12:42.016517-05
11	auth	0009_alter_user_last_name_max_length	2024-03-14 19:12:42.022987-05
12	auth	0010_alter_group_name_max_length	2024-03-14 19:12:42.033866-05
13	auth	0011_update_proxy_permissions	2024-03-14 19:12:42.041007-05
14	auth	0012_alter_user_first_name_max_length	2024-03-14 19:12:42.047721-05
15	cuenta	0001_initial	2024-03-14 19:12:42.124881-05
16	admin	0001_initial	2024-03-14 19:12:42.144765-05
17	admin	0002_logentry_remove_auto_add	2024-03-14 19:12:42.155115-05
18	admin	0003_logentry_add_action_flag_choices	2024-03-14 19:12:42.166074-05
19	django_celery_beat	0001_initial	2024-03-14 19:12:42.197082-05
20	django_celery_beat	0002_auto_20161118_0346	2024-03-14 19:12:42.21187-05
21	django_celery_beat	0003_auto_20161209_0049	2024-03-14 19:12:42.223503-05
22	django_celery_beat	0004_auto_20170221_0000	2024-03-14 19:12:42.228749-05
23	django_celery_beat	0005_add_solarschedule_events_choices	2024-03-14 19:12:42.233232-05
24	django_celery_beat	0006_auto_20180322_0932	2024-03-14 19:12:42.25856-05
25	django_celery_beat	0007_auto_20180521_0826	2024-03-14 19:12:42.271184-05
26	django_celery_beat	0008_auto_20180914_1922	2024-03-14 19:12:42.292775-05
27	django_celery_beat	0006_auto_20180210_1226	2024-03-14 19:12:42.304701-05
28	django_celery_beat	0006_periodictask_priority	2024-03-14 19:12:42.312514-05
29	django_celery_beat	0009_periodictask_headers	2024-03-14 19:12:42.32053-05
30	django_celery_beat	0010_auto_20190429_0326	2024-03-14 19:12:42.433631-05
31	django_celery_beat	0011_auto_20190508_0153	2024-03-14 19:12:42.456438-05
32	django_celery_beat	0012_periodictask_expire_seconds	2024-03-14 19:12:42.466981-05
33	django_celery_beat	0013_auto_20200609_0727	2024-03-14 19:12:42.477365-05
34	django_celery_beat	0014_remove_clockedschedule_enabled	2024-03-14 19:12:42.4841-05
35	django_celery_beat	0015_edit_solarschedule_events_choices	2024-03-14 19:12:42.489237-05
36	django_celery_beat	0016_alter_crontabschedule_timezone	2024-03-14 19:12:42.495733-05
37	django_celery_beat	0017_alter_crontabschedule_month_of_year	2024-03-14 19:12:42.503121-05
38	django_celery_beat	0018_improve_crontab_helptext	2024-03-14 19:12:42.510409-05
39	marketing	0001_initial	2024-03-14 19:12:42.768677-05
40	ventas	0001_initial	2024-03-14 19:12:43.517075-05
41	multimedia	0001_initial	2024-03-14 19:12:43.65543-05
42	sessions	0001_initial	2024-03-14 19:12:43.668053-05
43	token_blacklist	0001_initial	2024-03-14 19:12:43.745911-05
44	token_blacklist	0002_outstandingtoken_jti_hex	2024-03-14 19:12:43.76727-05
45	token_blacklist	0003_auto_20171017_2007	2024-03-14 19:12:43.806574-05
46	token_blacklist	0004_auto_20171017_2013	2024-03-14 19:12:43.831259-05
47	token_blacklist	0005_remove_outstandingtoken_jti	2024-03-14 19:12:43.856678-05
48	token_blacklist	0006_auto_20171017_2113	2024-03-14 19:12:43.879936-05
49	token_blacklist	0007_auto_20171017_2214	2024-03-14 19:12:43.938411-05
50	token_blacklist	0008_migrate_to_bigautofield	2024-03-14 19:12:44.00572-05
51	token_blacklist	0010_fix_migrate_to_bigautofield	2024-03-14 19:12:44.041919-05
52	token_blacklist	0011_linearizes_history	2024-03-14 19:12:44.046067-05
53	token_blacklist	0012_alter_outstandingtoken_user	2024-03-14 19:12:44.079187-05
\.


--
-- Data for Name: django_session; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.django_session (session_key, session_data, expire_date) FROM stdin;
du7x91uhyq8khaeh9cie9zjqv57v1zz6	.eJxVjDsOwjAQBe_iGlnx36Gk5wzWeneNAyiW4qRC3B0ipYD2zcx7iQTbWtPWeUkTibNQ4vS7ZcAHzzugO8y3JrHN6zJluSvyoF1eG_Hzcrh_BxV6_dYMwaNix2DZcCxjRkbkOBbmaAew2mVdMvkhwEjRKa1NiKYY9J4ogHh_ACE-OQQ:1rkvDL:rWYsFVOTLL39yvV1G9b7B6BXURxWLnVZiU8KHDJZ580	2024-03-28 19:14:23.791648-05
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
1	Socabaya	Por ahi	S01		2024-03-14 19:46:53.749826-05	2024-03-14 19:47:10.316819-05	A	1	1
2	Alamos	Por ahi	alamos01		2024-03-14 23:13:10.891777-05	2024-03-14 23:13:43.628037-05	A	1	1
\.


--
-- Data for Name: marketing_campania; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.marketing_campania (id, nombre, organico, codigo, fecha_estimada, fecha_cierre, "coste_realSoles", "coste_realDolares", descripcion, fecha_creacion, fecha_actualizacion, categoria_id, estado_id, proyecto_id, "usuarioActualizador_id", "usuarioCreador_id") FROM stdin;
1	Socabaya_organico	f	Socabaya_organico	\N	\N	500	136.43	\N	2024-03-14 19:46:53.757082-05	2024-03-14 22:18:38.348798-05	7	I	1	\N	\N
2	Socabaya Facebook	f	socabayafacebook_facebook_3_2	2024-03-01	2024-03-31	1999	545.43		2024-03-14 19:49:27.718063-05	2024-03-14 23:11:15.630923-05	3	A	1	\N	1
3	Alamos_organico	f	Alamos_organico	\N	\N	0	0	\N	2024-03-14 23:13:10.903321-05	2024-03-14 23:13:10.903734-05	7	A	2	\N	\N
4	campañña facebook alamos	f	campaññafacebookalamos_facebook_3_4	2024-03-07	2024-03-17	910	248.29		2024-03-14 23:24:05.274553-05	2024-03-14 23:25:54.705789-05	3	A	2	\N	1
\.


--
-- Data for Name: marketing_presupuestoproyecto; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.marketing_presupuestoproyecto (id, "presupuestoSoles", "gastoTotalCampaniasSoles", "presupuestoDolares", "gastoTotalCampaniasDolares", "tipoCambioSoles", "fechaPresupuesto", fecha_creacion, fecha_actualizacion, estado_id, proyecto_id, "usuarioActualizador_id", "usuarioCreador_id") FROM stdin;
1	500	2499	136.43	681.86	3.665	2024-03-14	2024-03-14 21:45:27.778031-05	2024-03-14 23:11:15.621523-05	A	1	\N	\N
2	5500	910	1500.68	248.29	3.665	2024-03-14	2024-03-14 23:23:12.551324-05	2024-03-14 23:25:54.703846-05	A	2	\N	\N
\.


--
-- Data for Name: marketing_gastocampania; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.marketing_gastocampania (id, "gastoSoles", "gastoDolares", "tipoCambioSoles", "fechaGasto", fecha_creacion, fecha_actualizacion, campania_id, estado_id, "presupuestoProyecto_id", "usuarioActualizador_id", "usuarioCreador_id") FROM stdin;
1	500	136.43	3.665	2024-03-15	2024-03-14 21:47:24.117551-05	2024-03-14 21:47:24.118108-05	1	A	1	\N	1
2	666	181.72	3.665	2024-03-14	2024-03-14 22:07:53.833131-05	2024-03-14 22:07:53.833564-05	2	A	1	\N	1
3	666	181.72	3.665	2024-03-13	2024-03-14 22:08:01.814656-05	2024-03-14 22:08:01.814981-05	2	A	1	\N	1
4	666	181.72	3.665	2024-03-02	2024-03-14 22:09:09.694601-05	2024-03-14 22:09:09.695025-05	2	A	1	\N	1
6	1	0.27	3.665	2024-03-01	2024-03-14 22:18:20.750474-05	2024-03-14 22:18:20.750973-05	2	A	1	\N	1
8	888	242.29	3.665	2024-03-31	2024-03-14 23:25:11.545499-05	2024-03-14 23:25:45.379864-05	4	A	2	1	1
7	22	6	3.665	2024-03-01	2024-03-14 23:25:04.351514-05	2024-03-14 23:25:54.691656-05	4	A	2	1	1
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

COPY public.ventas_producto (id, nombre, codigo, reservado, numero, area, fecha_creacion, fecha_actualizacion, estado_id, proyecto_id, tipo_id, "usuarioActualizador_id", "usuarioCreador_id") FROM stdin;
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
1	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcxMDQ3NzE5MCwiaWF0IjoxNzEwNDYyNzkwLCJqdGkiOiI2NzFjNTU2NGFjYzg0MjZhYWJiZjY2YzIwNzBkNDM2NSIsInVzZXJfaWQiOjF9.TuJ8Uzj1hBlQ2X-t2omaDg6ABRRpejsXeGhX2uxo0kg	2024-03-14 19:33:10.445853-05	2024-03-14 23:33:10-05	1	671c5564acc8426aabbf66c2070d4365
2	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcxMDQ3NzYzMSwiaWF0IjoxNzEwNDYzMjMxLCJqdGkiOiJhZmExMzU5OTFlOTg0MzNhYjhmOTA1ZTY5YjljYThlMSIsInVzZXJfaWQiOjN9.RUJG3G1daCizpHom92vsWT8VSpgsIZgtokKGgem4Z3Q	2024-03-14 19:40:31.794233-05	2024-03-14 23:40:31-05	3	afa135991e98433ab8f905e69b9ca8e1
3	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcxMDQ3NzY5NiwiaWF0IjoxNzEwNDYzMjk2LCJqdGkiOiI2OWEwZmE3NzAwNjg0OTYyOWNjYTdmM2ViZTBlYmQxZiIsInVzZXJfaWQiOjF9.VJPq_62As6Zt7I8YDX8c7PW1pL3UQWYl2y1X3yM56Q8	2024-03-14 19:41:36.48007-05	2024-03-14 23:41:36-05	1	69a0fa77006849629cca7f3ebe0ebd1f
4	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcxMDQ3ODIwOSwiaWF0IjoxNzEwNDYzODA5LCJqdGkiOiJmYzQwZmYzYjY5Mjc0MzQxOTEyZTYyNjFlNzNiYzAxOCIsInVzZXJfaWQiOjN9.J8z0gZagr_oPiwrbr54J4gO_BJIo_m8kPvauNvZOz2E	2024-03-14 19:50:09.904786-05	2024-03-14 23:50:09-05	3	fc40ff3b69274341912e6261e73bc018
5	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcxMDQ4MTIxOSwiaWF0IjoxNzEwNDY2ODE5LCJqdGkiOiI2OGFkMzY1Y2U1YTc0NjNjYTY4NDg5Y2QzMDczNGFiMiIsInVzZXJfaWQiOjJ9.ttej8z33UJKFehE9-lY1lSMPu5RWDJ_f9lXvXROAWuU	2024-03-14 20:40:19.359543-05	2024-03-15 00:40:19-05	2	68ad365ce5a7463ca68489cd30734ab2
6	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcxMDQ4MTMwNSwiaWF0IjoxNzEwNDY2OTA1LCJqdGkiOiI1Zjg2YWYzZjRkMmI0YWI1YWFhZTUyOWU4ZDM1Y2Y1NSIsInVzZXJfaWQiOjV9.70HftZrHHk274QtndFvUcUFyQaLicZlLCGb_1q-cJYU	2024-03-14 20:41:45.177507-05	2024-03-15 00:41:45-05	5	5f86af3f4d2b4ab5aaae529e8d35cf55
7	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcxMDQ4MTQ4NywiaWF0IjoxNzEwNDY3MDg3LCJqdGkiOiI2N2ZhMWE1NmUxMWI0Yjk1YTUwZjQyYTg4NzVmZjdiOCIsInVzZXJfaWQiOjN9.k6iRSFzRrGkCHWLXYbaMoedSoBQqZJMUiolTlil9Ekg	2024-03-14 20:44:47.409765-05	2024-03-15 00:44:47-05	3	67fa1a56e11b4b95a50f42a8875ff7b8
8	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcxMDQ4MTgwMSwiaWF0IjoxNzEwNDY3NDAxLCJqdGkiOiI1NjRkZjA4MWZiM2U0NjkwYmVlMjFlNmQ2MzNhOTY5OSIsInVzZXJfaWQiOjV9.kLK_N5y_IpYWtMFpcivGdTTCYbnObw0nHbWNZd-4j0Q	2024-03-14 20:50:01.433564-05	2024-03-15 00:50:01-05	5	564df081fb3e4690bee21e6d633a9699
9	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcxMDQ4NDgxNiwiaWF0IjoxNzEwNDcwNDE2LCJqdGkiOiJkOWJkZmU4YzJjZjQ0OGI3YWE4Mzk1ZDFjNDEzMGY3OSIsInVzZXJfaWQiOjF9.VW3DlRPArp1E4YSVkprVOB9b_tlCbvNmC7zBdX12Xw8	2024-03-14 21:40:16.200529-05	2024-03-15 01:40:16-05	1	d9bdfe8c2cf448b7aa8395d1c4130f79
10	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcxMDQ4NzUzNSwiaWF0IjoxNzEwNDczMTM1LCJqdGkiOiJmZjE1OTBlMTAwYmI0MzAzOGFhN2JjNjlmMjU4MDJjMSIsInVzZXJfaWQiOjF9.RvYZu4OyEgmjYsy22DaRKcx8Tdtjg7HXrU5k1UMTP24	2024-03-14 22:25:35.993737-05	2024-03-15 02:25:35-05	1	ff1590e100bb43038aa7bc69f25802c1
11	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcxMDQ4ODA3NywiaWF0IjoxNzEwNDczNjc3LCJqdGkiOiJlY2QxNGJjYzkzMDQ0YWJkOWNhNWQ2Y2Y4YTNkZGM0NCIsInVzZXJfaWQiOjN9.W-WZGKQG1ulrTh08HBj_U7M_MtwQzzTtJ9fsTEGyWF8	2024-03-14 22:34:37.52986-05	2024-03-15 02:34:37-05	3	ecd14bcc93044abd9ca5d6cf8a3ddc44
12	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcxMDQ4ODE4NywiaWF0IjoxNzEwNDczNzg3LCJqdGkiOiI1Nzc5NDAyNzMxY2E0MzE0YmYwNDFlYTNlOWEwOTRhZiIsInVzZXJfaWQiOjV9.Xfo2nx1qX8skUaZvkimOH1Cj9FlIYhNrTogx3pHz1dk	2024-03-14 22:36:27.235344-05	2024-03-15 02:36:27-05	5	5779402731ca4314bf041ea3e9a094af
13	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcxMDQ4ODI0MSwiaWF0IjoxNzEwNDczODQxLCJqdGkiOiJiODAzMDVmZGFiMjU0NGFjYmVlMjkxNmExYTg1NDAyZCIsInVzZXJfaWQiOjN9.LHZB2fw8Ub6ry1srUoaC5GqYwbHJn3tt09OLGf0iQvo	2024-03-14 22:37:21.59691-05	2024-03-15 02:37:21-05	3	b80305fdab2544acbee2916a1a85402d
14	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcxMDQ5MDMxNiwiaWF0IjoxNzEwNDc1OTE2LCJqdGkiOiI5NjVhMGQwZmQ0YmQ0YzAzOGRiNmMzODBmYjg5NzRiNyIsInVzZXJfaWQiOjF9.qup0WH1SCb_GiM0IsWopA7sXbzbH6Fu6HN9UxHY45E8	2024-03-14 23:11:56.080995-05	2024-03-15 03:11:56-05	1	965a0d0fd4bd4c038db6c380fb8974b7
15	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcxMDQ5MTE5OCwiaWF0IjoxNzEwNDc2Nzk4LCJqdGkiOiJmODc4ODJlYWNlM2I0ZjVjYmUwNTBjMGEzYWMyYzFkYSIsInVzZXJfaWQiOjN9.WPotqMpQ6yWBc6t-3EyxoFrlj6pPVdZeBmeq0c_liZY	2024-03-14 23:26:38.945199-05	2024-03-15 03:26:38-05	3	f87882eace3b4f5cbe050c0a3ac2c1da
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

COPY public.ventas_lead (id, nombre, apellido, asignado, celular, celular2, comentario, "horaRecepcion", llamar, importante, fecha_asignacion, fecha_desasignacion, "recienCreado", fecha_creacion, fecha_actualizacion, asesor_id, campania_id, estado_id, "estadoLead_id", objecion_id, "usuarioActualizador_id", "usuarioCreador_id") FROM stdin;
35	Carlos	Ruiz Begazo	t	983139696	\N		2024-02-04 00:00:00-05	t	f	2024-03-14 21:37:29-05	2024-03-14 21:38:07-05	f	2024-03-14 20:46:22-05	2024-03-14 22:31:35.088615-05	2	1	A	EP	1	5	\N
41	Samuel		t	913949511	\N		2024-03-14 20:46:22.31246-05	t	f	2024-03-14 22:35:14.672112-05	\N	f	2024-03-14 20:46:22.319312-05	2024-03-14 22:35:14.673921-05	2	2	A	EP	1	\N	\N
40	Percy		t	911249144	913949194	Quiere atencion inmediata	2024-03-14 20:46:22.303249-05	t	f	2024-03-14 22:35:14.688434-05	\N	f	2024-03-14 20:46:22.310355-05	2024-03-14 22:35:14.689885-05	4	1	A	EP	1	\N	\N
39	Miguel	Peche	t	911393941	\N		2024-02-05 00:00:00-05	t	f	2024-03-14 22:35:14.696553-05	\N	f	2024-03-14 20:46:22.300673-05	2024-03-14 22:35:14.698564-05	5	1	A	EP	1	\N	\N
38			t	983123832	988413		2024-03-14 20:46:22.286877-05	t	f	2024-03-14 22:35:14.706404-05	\N	f	2024-03-14 20:46:22.29183-05	2024-03-14 22:35:14.710456-05	2	1	A	EP	1	\N	\N
37	Juan		t	98732341	\N		2024-03-14 20:46:22.27897-05	t	f	2024-03-14 22:35:14.717662-05	\N	f	2024-03-14 20:46:22.284064-05	2024-03-14 22:35:14.718816-05	4	1	A	EP	1	\N	\N
36	Solange	Calla Caceres	t	aaa	\N		2024-02-04 00:00:00-05	t	f	2024-03-14 22:35:14.724704-05	\N	f	2024-03-14 20:46:22.275319-05	2024-03-14 22:35:14.726102-05	5	1	A	EP	1	\N	\N
43			t	936485732		Atencion no urgente	2024-03-14 20:46:22.334168-05	t	f	2024-03-14 22:36:45.087111-05	2024-03-14 21:35:45.149686-05	f	2024-03-14 20:46:22.342489-05	2024-03-14 22:36:45.089186-05	2	2	A	EP	1	5	\N
42			t	944857396			2024-06-02 00:00:00-05	t	f	2024-03-14 22:36:45.099885-05	2024-03-14 21:35:16.096889-05	f	2024-03-14 20:46:22.330419-05	2024-03-14 22:36:45.100894-05	4	2	A	EP	1	5	\N
34	Andrew	Jacobo Castillo	t	987652321			2024-02-04 00:00:00-05	t	f	2024-03-14 22:36:45.109071-05	2024-03-14 21:23:33.408129-05	f	2024-03-14 20:46:22.253346-05	2024-03-14 22:36:45.110388-05	5	1	A	EP	1	5	\N
33	Jose	Martineli Alvarez	t	915465876			2024-02-03 00:00:00-05	t	f	2024-03-14 22:36:45.116104-05	2024-03-14 21:35:39.854003-05	f	2024-03-14 20:46:22.2272-05	2024-03-14 22:36:45.117206-05	2	1	A	EP	1	5	\N
\.


--
-- Data for Name: ventas_desasignacionleadasesor; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.ventas_desasignacionleadasesor (id, fecha, lead_id, usuario_id) FROM stdin;
1	2024-03-14 21:22:41.664154-05	35	2
2	2024-03-14 21:23:33.408211-05	34	2
3	2024-03-14 21:35:16.096991-05	42	2
4	2024-03-14 21:35:28.893068-05	33	2
5	2024-03-14 21:35:39.854068-05	33	4
6	2024-03-14 21:35:45.149754-05	43	2
7	2024-03-14 21:38:07.595285-05	35	4
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

COPY public.ventas_evento (id, titulo, duracion, fecha_visita, observacion, fecha_creacion, fecha_actualizacion, separado, asesor_id, estado_id, "estadoEvento_id", lead_id, objecion_id, tipo_id, "usuarioActualizador_id", "usuarioCreador_id") FROM stdin;
\.


--
-- Data for Name: ventas_historicoleadasesor; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.ventas_historicoleadasesor (id, fecha_creacion, lead_id, usuario_id) FROM stdin;
25	2024-03-14 20:46:22.240153-05	33	2
26	2024-03-14 20:46:22.255878-05	34	2
27	2024-03-14 20:46:22.26892-05	35	2
28	2024-03-14 20:46:22.332966-05	42	2
29	2024-03-14 20:46:22.345031-05	43	2
30	2024-03-14 21:35:28.900131-05	33	4
31	2024-03-14 21:37:29.487895-05	35	4
32	2024-03-14 22:35:14.679971-05	41	2
33	2024-03-14 22:35:14.69185-05	40	4
34	2024-03-14 22:35:14.700362-05	39	5
35	2024-03-14 22:35:14.71273-05	38	2
36	2024-03-14 22:35:14.720635-05	37	4
37	2024-03-14 22:35:14.728396-05	36	5
38	2024-03-14 22:36:45.09577-05	43	2
39	2024-03-14 22:36:45.102694-05	42	4
40	2024-03-14 22:36:45.112505-05	34	5
41	2024-03-14 22:36:45.118879-05	33	2
\.


--
-- Data for Name: ventas_llamada; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.ventas_llamada (id, detalle, contesto, fecha_creacion, fecha_actualizacion, asesor_id, estado_id, lead_id, objecion_id, "usuarioActualizador_id", "usuarioCreador_id") FROM stdin;
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

SELECT pg_catalog.setval('public.cuenta_user_groups_id_seq', 5, true);


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

SELECT pg_catalog.setval('public.django_admin_log_id_seq', 33, true);


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

SELECT pg_catalog.setval('public.marketing_campania_id_seq', 4, true);


--
-- Name: marketing_categoria_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.marketing_categoria_id_seq', 7, true);


--
-- Name: marketing_gastocampania_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.marketing_gastocampania_id_seq', 8, true);


--
-- Name: marketing_presupuestoproyecto_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.marketing_presupuestoproyecto_id_seq', 2, true);


--
-- Name: marketing_proyecto_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.marketing_proyecto_id_seq', 2, true);


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

SELECT pg_catalog.setval('public.token_blacklist_outstandingtoken_id_seq', 15, true);


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

SELECT pg_catalog.setval('public.ventas_desasignacionleadasesor_id_seq', 7, true);


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

SELECT pg_catalog.setval('public.ventas_historicoleadasesor_id_seq', 41, true);


--
-- Name: ventas_lead_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.ventas_lead_id_seq', 43, true);


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

