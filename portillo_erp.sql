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
1	pbkdf2_sha256$600000$BMJ8LF8DGDtK75g1jlAJbH$pvS/k25Y+f0BUQQBOycCYkIImuQJm/vZkxb3UI3Qpzg=	\N	t	andrew				t	t	2023-12-29 14:19:22-05	asesor_a	A	1
2	pbkdf2_sha256$600000$Ntgg4ISllhxBbS1dKBkaxF$NDEQuIj95L9YZlaRkumq6mh4nhjUnNnndDsjMahaQj8=	2023-12-30 10:59:21-05	t	qwerty	BRIAN	VELASCO		t	t	2023-12-29 14:19:38-05	04014	A	\N
\.


--
-- Data for Name: cuenta_user_groups; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.cuenta_user_groups (id, user_id, group_id) FROM stdin;
11	2	4
14	1	1
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
14	2023-12-29 15:52:54.384857-05	1	socabaya	1	[{"added": {}}]	9	2
15	2023-12-29 15:53:19.570236-05	1	Facebook	1	[{"added": {}}]	10	2
16	2023-12-29 15:53:40.804419-05	1	Socabaya	1	[{"added": {}}]	11	2
17	2023-12-29 15:55:33.434991-05	1	BRIAN	1	[{"added": {}}]	15	2
18	2023-12-29 15:56:37.561293-05	1	BRIAN	2	[{"changed": {"fields": ["EstadoLead"]}}]	15	2
19	2023-12-29 16:00:44.328868-05	1	BRIAN	2	[{"changed": {"fields": ["Asesor", "Campania"]}}]	15	2
20	2023-12-29 16:04:30.444975-05	1	BRIAN	2	[{"changed": {"fields": ["Asesor"]}}]	15	2
21	2023-12-29 16:11:53.038879-05	1	BRIAN	2	[{"changed": {"fields": ["Asesor"]}}]	15	2
22	2023-12-29 16:13:18.426993-05	1	BRIAN	2	[{"changed": {"fields": ["Asesor"]}}]	15	2
23	2023-12-29 16:13:53.381235-05	1	BRIAN	2	[{"changed": {"fields": ["Asesor"]}}]	15	2
24	2023-12-29 16:36:37.839378-05	1	BRIAN	2	[{"changed": {"fields": ["Asesor"]}}]	15	2
25	2023-12-29 18:25:53.132373-05	1	Socabaya Faceook	2	[{"changed": {"fields": ["Nombre", "Codigo"]}}]	11	2
26	2023-12-29 18:26:29.851093-05	2	Alamos	1	[{"added": {}}]	9	2
27	2023-12-29 18:26:49.432248-05	2	Alamos Facebook	1	[{"added": {}}]	11	2
28	2023-12-29 18:27:25.133636-05	2	Fisico	1	[{"added": {}}]	10	2
29	2023-12-29 18:27:33.333612-05	3	Socabaya fisico	1	[{"added": {}}]	11	2
30	2023-12-29 19:19:10.632712-05	2	qwerty	2	[{"changed": {"fields": ["Groups", "CodigoAsesor"]}}]	8	2
31	2023-12-29 19:19:14.755092-05	1	andrew	2	[]	8	2
32	2023-12-29 19:19:48.207118-05	1	andrew	2	[{"changed": {"fields": ["Groups"]}}]	8	2
33	2023-12-29 19:19:48.23085-05	1	andrew	2	[]	8	2
34	2023-12-29 19:22:34.697561-05	3	Recursos Humanos	2	[]	3	2
35	2023-12-29 19:22:55.20508-05	3	Recursos Humanos	2	[{"changed": {"fields": ["Permissions"]}}]	3	2
36	2023-12-29 19:24:35.757069-05	2	qwerty	2	[{"changed": {"fields": ["First name", "Last name", "CodigoAsesor"]}}]	8	2
37	2023-12-29 19:26:10.978975-05	3	Recursos Humanos	2	[{"changed": {"fields": ["Permissions"]}}]	3	2
38	2023-12-29 19:27:19.048066-05	3	Recursos Humanos	2	[{"changed": {"fields": ["Permissions"]}}]	3	2
39	2023-12-29 19:27:19.084828-05	3	Recursos Humanos	2	[]	3	2
40	2023-12-29 21:00:30.695714-05	4	JEFE_VENTAS	2	[{"changed": {"fields": ["Name"]}}]	3	2
41	2023-12-29 21:00:49.544953-05	2	marketing	2	[{"changed": {"fields": ["Name"]}}]	3	2
42	2023-12-29 21:00:59.768883-05	3	recursos_humanos	2	[{"changed": {"fields": ["Name"]}}]	3	2
43	2023-12-29 21:01:08.006147-05	4	jefe_ventas	2	[{"changed": {"fields": ["Name"]}}]	3	2
44	2023-12-29 21:01:12.161765-05	1	asesor	2	[{"changed": {"fields": ["Name"]}}]	3	2
45	2023-12-29 21:15:44.637866-05	2	qwerty	2	[{"changed": {"fields": ["Groups"]}}]	8	2
46	2023-12-29 21:15:49.504322-05	1	andrew	2	[{"changed": {"fields": ["Groups"]}}]	8	2
47	2023-12-29 21:18:44.294518-05	2	qwerty	2	[{"changed": {"fields": ["Groups"]}}]	8	2
48	2023-12-29 22:12:41.924153-05	1	Firma de contrato	1	[{"added": {}}]	18	2
49	2023-12-29 22:12:49.755795-05	2	Visita	1	[{"added": {}}]	18	2
50	2023-12-29 22:13:25.41477-05	1	Firma del contrato de socabaya	1	[{"added": {}}]	27	2
51	2023-12-30 10:49:15.996697-05	1	Firma del contrato de socabaya	2	[{"changed": {"fields": ["Asesor"]}}]	27	2
52	2023-12-30 10:59:32.395412-05	2	qwerty	2	[{"changed": {"fields": ["Groups"]}}]	8	2
53	2023-12-30 10:59:53.809238-05	2	qwerty	2	[{"changed": {"fields": ["Groups"]}}]	8	2
54	2023-12-30 21:58:15.482781-05	1	andrew	2	[{"changed": {"fields": ["Groups"]}}]	8	2
55	2023-12-30 21:58:26.698844-05	2	qwerty	2	[{"changed": {"fields": ["Groups"]}}]	8	2
56	2024-01-02 10:28:15.124157-05	2	qwerty	2	[{"changed": {"fields": ["Groups"]}}]	8	2
57	2024-01-02 10:32:39.892643-05	2	qwerty	2	[{"changed": {"fields": ["Groups"]}}]	8	2
58	2024-01-02 10:35:26.350569-05	1	andrew	2	[{"changed": {"fields": ["Groups"]}}]	8	2
59	2024-01-02 10:49:55.100324-05	1	WhatsApp object (1)	2	[{"changed": {"fields": ["Lead"]}}]	15	2
60	2024-01-02 10:49:58.047215-05	2	WhatsApp object (2)	2	[]	15	2
61	2024-01-02 10:50:09.688385-05	1	WhatsApp object (1)	2	[]	15	2
62	2024-01-02 10:50:15.517483-05	2	WhatsApp object (2)	2	[]	15	2
63	2024-01-02 10:53:29.805653-05	1	Llamada object (1)	1	[{"added": {}}]	24	2
64	2024-01-02 10:55:24.371236-05	3	Tony Hawk	2	[{"changed": {"fields": ["Nombre"]}}]	14	2
65	2024-01-02 10:57:38.056236-05	10	Paul Rodiguez-934789123	2	[{"changed": {"fields": ["Nombre", "Fecha actualizacion"]}}]	14	2
66	2024-01-02 10:58:13.60826-05	9	Jesus-958742315	2	[{"changed": {"fields": ["Apellido", "Fecha actualizacion"]}}]	14	2
67	2024-01-02 10:58:18.508216-05	9	Jesus-958742315	2	[]	14	2
68	2024-01-02 10:58:40.249157-05	7	Aaron-934789123	2	[{"changed": {"fields": ["Nombre", "Apellido"]}}]	14	2
69	2024-01-02 10:58:59.710332-05	5	Boulala-999875468	2	[{"changed": {"fields": ["Nombre"]}}]	14	2
70	2024-01-02 10:59:52.826485-05	4	Eric-934789123	2	[{"changed": {"fields": ["Nombre", "Apellido"]}}]	14	2
71	2024-01-02 11:00:02.426714-05	2	Luan-999875468	2	[{"changed": {"fields": ["Nombre", "Apellido"]}}]	14	2
72	2024-01-02 21:25:44.565556-05	2	qwerty	2	[{"changed": {"fields": ["Proyecto"]}}]	8	2
73	2024-01-02 21:46:18.794126-05	1	andrew	2	[{"changed": {"fields": ["Proyecto"]}}]	8	2
74	2024-01-02 21:46:36.696664-05	1	andrew	2	[{"changed": {"fields": ["Proyecto"]}}]	8	2
75	2024-01-02 21:47:40.65237-05	2	qwerty	2	[]	8	2
76	2024-01-02 21:49:11.322947-05	1	BRIAN-935488033	2	[{"changed": {"fields": ["Asesor"]}}]	14	2
77	2024-01-02 21:52:21.466878-05	2	qwerty	2	[]	8	2
78	2024-01-02 21:53:25.907779-05	1	andrew	2	[{"changed": {"fields": ["Groups"]}}]	8	2
79	2024-01-02 21:53:42.969699-05	1	andrew	2	[{"changed": {"fields": ["Groups"]}}]	8	2
80	2024-01-02 21:54:12.971654-05	2	qwerty	2	[]	8	2
81	2024-01-02 21:55:23.777708-05	2	qwerty	2	[{"changed": {"fields": ["Proyecto"]}}]	8	2
82	2024-01-02 21:58:03.891947-05	2	qwerty	2	[{"changed": {"fields": ["Proyecto"]}}]	8	2
83	2024-01-02 21:58:07.058462-05	2	qwerty	2	[]	8	2
\.


--
-- Data for Name: django_migrations; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.django_migrations (id, app, name, applied) FROM stdin;
1	contenttypes	0001_initial	2023-12-30 11:09:34.207865-05
2	contenttypes	0002_remove_content_type_name	2023-12-30 11:09:34.221421-05
3	auth	0001_initial	2023-12-30 11:09:34.284607-05
4	auth	0002_alter_permission_name_max_length	2023-12-30 11:09:34.294499-05
5	auth	0003_alter_user_email_max_length	2023-12-30 11:09:34.305187-05
6	auth	0004_alter_user_username_opts	2023-12-30 11:09:34.320381-05
7	auth	0005_alter_user_last_login_null	2023-12-30 11:09:34.337135-05
8	auth	0006_require_contenttypes_0002	2023-12-30 11:09:34.343029-05
9	auth	0007_alter_validators_add_error_messages	2023-12-30 11:09:34.358719-05
10	auth	0008_alter_user_username_max_length	2023-12-30 11:09:34.374398-05
11	auth	0009_alter_user_last_name_max_length	2023-12-30 11:09:34.389712-05
12	auth	0010_alter_group_name_max_length	2023-12-30 11:09:34.404386-05
13	auth	0011_update_proxy_permissions	2023-12-30 11:09:34.428683-05
14	auth	0012_alter_user_first_name_max_length	2023-12-30 11:09:34.440781-05
15	cuenta	0001_initial	2023-12-30 11:09:34.545701-05
16	admin	0001_initial	2023-12-30 11:09:34.583493-05
17	admin	0002_logentry_remove_auto_add	2023-12-30 11:09:34.602666-05
18	admin	0003_logentry_add_action_flag_choices	2023-12-30 11:09:34.625963-05
19	marketing	0001_initial	2023-12-30 11:09:34.756674-05
20	sessions	0001_initial	2023-12-30 11:09:34.773528-05
21	token_blacklist	0001_initial	2023-12-30 11:09:34.836998-05
22	token_blacklist	0002_outstandingtoken_jti_hex	2023-12-30 11:09:34.865899-05
23	token_blacklist	0003_auto_20171017_2007	2023-12-30 11:09:34.90559-05
24	token_blacklist	0004_auto_20171017_2013	2023-12-30 11:09:34.938247-05
25	token_blacklist	0005_remove_outstandingtoken_jti	2023-12-30 11:09:34.960278-05
26	token_blacklist	0006_auto_20171017_2113	2023-12-30 11:09:34.988059-05
27	token_blacklist	0007_auto_20171017_2214	2023-12-30 11:09:35.04678-05
28	token_blacklist	0008_migrate_to_bigautofield	2023-12-30 11:09:35.119897-05
29	token_blacklist	0010_fix_migrate_to_bigautofield	2023-12-30 11:09:35.154462-05
30	token_blacklist	0011_linearizes_history	2023-12-30 11:09:35.158243-05
31	token_blacklist	0012_alter_outstandingtoken_user	2023-12-30 11:09:35.189978-05
32	ventas	0001_initial	2023-12-30 11:09:36.308812-05
36	cuenta	0002_user_proyecto	2024-01-02 21:25:20.264531-05
37	cuenta	0003_alter_user_proyecto	2024-01-02 21:57:55.434695-05
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
1	socabaya	socabaya		2023-12-29	2023-12-29 15:52:53-05	A	2	2
2	Alamos	\N		2023-12-29	2023-12-29 18:26:29-05	A	2	2
\.


--
-- Data for Name: marketing_campania; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.marketing_campania (id, nombre, codigo, fecha_creacion, fecha_estimada, fecha_cierre, coste_estimado, coste_real, descripcion, fecha_actualizacion, categoria_id, estado_id, proyecto_id, "usuarioActualizador_id", "usuarioCreador_id") FROM stdin;
1	Socabaya Faceook	facebook_socabaya	2023-12-29 18:25:53.130866-05	2023-12-29	2023-12-29	0	0		2023-12-29 15:53:04-05	1	A	1	2	1
2	Alamos Facebook	facebook_alamos	2023-12-29 18:26:49.430875-05	2023-12-29	2023-12-29	0	0		2023-12-29 18:26:42-05	1	A	2	2	2
3	Socabaya fisico	fisico_socabaya	2023-12-29 18:27:33.332633-05	2023-12-29	2023-12-29	0	0		2023-12-29 18:27:32-05	2	A	1	2	2
\.


--
-- Data for Name: token_blacklist_outstandingtoken; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.token_blacklist_outstandingtoken (id, token, created_at, expires_at, user_id, jti) FROM stdin;
1	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcwMzk4MTg5MCwiaWF0IjoxNzAzODk1NDkwLCJqdGkiOiI5ODhhMGFhZWU1NjY0ODRmYTVjM2I4MTU3ZTQwZjI2MiIsInVzZXJfaWQiOjJ9.xUyI_xaYP4jITRoHz2koVLM0bpSgafgWy4W_XrVh56w	2023-12-29 19:18:10.57334-05	2023-12-30 19:18:10-05	2	988a0aaee566484fa5c3b8157e40f262
2	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcwMzk4MTk2MiwiaWF0IjoxNzAzODk1NTYyLCJqdGkiOiI0YmRjZGY5YTIzYmQ0NzkwYTY1OWQyYjI4ZGU1ZWVmMiIsInVzZXJfaWQiOjJ9.1iarWs0zLdznVALsE27p3-Oti9YDP2zDQUh0JJU8c6k	2023-12-29 19:19:22.363578-05	2023-12-30 19:19:22-05	2	4bdcdf9a23bd4790a659d2b28de5eef2
3	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcwMzk4MTk5OSwiaWF0IjoxNzAzODk1NTk5LCJqdGkiOiI3NWUxMTRhYTFmN2U0MDlhYWQ1MDQ2MzRlNGRlY2YxMyIsInVzZXJfaWQiOjF9.UkeomvXirVX7E2pbq6XKQJYx8yn-yH5UXb7ZkkC5aLg	2023-12-29 19:19:59.895272-05	2023-12-30 19:19:59-05	1	75e114aa1f7e409aad504634e4decf13
4	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcwMzk4MjE4OCwiaWF0IjoxNzAzODk1Nzg4LCJqdGkiOiI5NDg1ZmNhY2JiYWM0YzQ2YjVhNDg1ZDRjNDUzYjIwNyIsInVzZXJfaWQiOjF9.a4q_txmIWnNEhhCkmY6cqmJ9m2b0TZjaNE9kZq3vxBs	2023-12-29 19:23:08.254996-05	2023-12-30 19:23:08-05	1	9485fcacbbac4c46b5a485d4c453b207
5	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcwMzk4MjE5OSwiaWF0IjoxNzAzODk1Nzk5LCJqdGkiOiJlMjg3MGU0ZTUyYTU0OWU4YTczODlhZTg4ZjZiMWUyNiIsInVzZXJfaWQiOjJ9.wiTHZLBRA9ewChd85fmh_EtXILUqikGIG6LFCUVDe4Q	2023-12-29 19:23:19.474386-05	2023-12-30 19:23:19-05	2	e2870e4e52a549e8a7389ae88f6b1e26
6	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcwMzk4MjI4OCwiaWF0IjoxNzAzODk1ODg4LCJqdGkiOiI1ZWY3MDJhNDM0N2U0NWU2OWU5NTkxMzU2ZjJkZDdkZCIsInVzZXJfaWQiOjJ9.28PuEEgCwBK1YfTPPZI1wxakJokSKqTIiN8af6UXo8U	2023-12-29 19:24:48.488721-05	2023-12-30 19:24:48-05	2	5ef702a4347e45e69e9591356f2dd7dd
7	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcwMzk4MjM3NywiaWF0IjoxNzAzODk1OTc3LCJqdGkiOiIzMTkzNDU5NzU2N2Y0ODY4YjgwYjk1OTUwM2M3YzNiYiIsInVzZXJfaWQiOjJ9.OELR3Oy2QHElDwTiiLsuOdiKIJBIlbCvIDavpsmXlzI	2023-12-29 19:26:17.358011-05	2023-12-30 19:26:17-05	2	31934597567f4868b80b959503c7c3bb
8	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcwMzk4MjQ1OCwiaWF0IjoxNzAzODk2MDU4LCJqdGkiOiIwNDZlYjUxNjliYmI0M2E0YjBhNGFlY2YzN2ZkYTczMSIsInVzZXJfaWQiOjJ9.6GeTXgsGI-5U2renn5Ntp3XxbfkRXnR95DgEJ2iaZFc	2023-12-29 19:27:38.753126-05	2023-12-30 19:27:38-05	2	046eb5169bbb43a4b0a4aecf37fda731
9	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcwMzk4MjUwNiwiaWF0IjoxNzAzODk2MTA2LCJqdGkiOiIyOThhOTM1OGI4NGE0MGM1YjQzOGUyMjhmYzg2ODZhZiIsInVzZXJfaWQiOjJ9.Eh15Mcj6_rwUGa3YFhaGqEdOiE8_vjlrlVieYB8Vkzc	2023-12-29 19:28:26.228049-05	2023-12-30 19:28:26-05	2	298a9358b84a40c5b438e228fc8686af
10	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcwMzk4MzA1MSwiaWF0IjoxNzAzODk2NjUxLCJqdGkiOiJkNjI3YWQxYmFiMmQ0YzM2OTFjY2U2N2E4ZjAxYTllYSIsInVzZXJfaWQiOjJ9.i3cruINpJPpwe0TbH9aoEmGaKIUBOk769wNffK_eJJ8	2023-12-29 19:37:31.989769-05	2023-12-30 19:37:31-05	2	d627ad1bab2d4c3691cce67a8f01a9ea
11	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcwMzk4NTYzNywiaWF0IjoxNzAzODk5MjM3LCJqdGkiOiI2NDI4MWFiMWU3OWY0NGU4OWUwMjE3YjdmOGQzMTA0ZiIsInVzZXJfaWQiOjJ9.wNZH7Z0JMOhmqrOCeeRFNvHTrgV6hFB1MDTaexpk7DE	2023-12-29 20:20:37.589203-05	2023-12-30 20:20:37-05	2	64281ab1e79f44e89e0217b7f8d3104f
12	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcwMzk4NTk3OCwiaWF0IjoxNzAzODk5NTc4LCJqdGkiOiJhYTE3MDg3ZTM5NGU0ODhkODdjMDM1YzU1NjE0YmQ4MSIsInVzZXJfaWQiOjJ9.RZYi42uqsdcrwX3eBT0gYlg20oPHPYb7OQ8ak0_w1hE	2023-12-29 20:26:18.835774-05	2023-12-30 20:26:18-05	2	aa17087e394e488d87c035c55614bd81
13	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcwMzk4NjU1NSwiaWF0IjoxNzAzOTAwMTU1LCJqdGkiOiIyOGIwZTJiN2M3NTk0YWYwOTc1Njg0NjE1MGE2Mzk5ZCIsInVzZXJfaWQiOjJ9.iN7VA0nyQkSrwudrqWmQJyC5aFEdQ_xTY7RJUx_z5Kw	2023-12-29 20:35:55.262673-05	2023-12-30 20:35:55-05	2	28b0e2b7c7594af09756846150a6399d
14	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcwMzk4Njk1NiwiaWF0IjoxNzAzOTAwNTU2LCJqdGkiOiI1NGQwOWQ2YzJkZTA0NDk3YjAyMzcxZjU0OGMzOGRiMCIsInVzZXJfaWQiOjJ9.7G49a5HJNros5t_fM3vFLBH2MIi_hJNDBoJ_hKktJxU	2023-12-29 20:42:36.116374-05	2023-12-30 20:42:36-05	2	54d09d6c2de04497b02371f548c38db0
15	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcwMzk4NzczOCwiaWF0IjoxNzAzOTAxMzM4LCJqdGkiOiJkYmZkZjhlYzZlNGY0MTBhYWJjNGUyODE0YTU5NGZlMSIsInVzZXJfaWQiOjJ9.d1u58qpFBheA0UW8REXLsvnWB7bADZtPlCY5p19lQYc	2023-12-29 20:55:38.442923-05	2023-12-30 20:55:38-05	2	dbfdf8ec6e4f410aabc4e2814a594fe1
16	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcwMzk4ODExOCwiaWF0IjoxNzAzOTAxNzE4LCJqdGkiOiJlNTRhMmIyZWU1MTI0OGMyYTMxOGUyNjg0ZGQ2NDUxYSIsInVzZXJfaWQiOjJ9.QiMTRUEtrwVKsgG_rkGriJQOPyS2OHwEJ_sWHmoxGiM	2023-12-29 21:01:58.557973-05	2023-12-30 21:01:58-05	2	e54a2b2ee51248c2a318e2684dd6451a
17	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcwMzk4ODUwOSwiaWF0IjoxNzAzOTAyMTA5LCJqdGkiOiI1Yjg0NTY3YjdkMjg0OGExYWVhZDM0MzFiY2Y5ZGI2ZCIsInVzZXJfaWQiOjJ9.dSRCNQxH82YFb-j5xkcWiIkW1fgmlN6mVmhv1Cmp2J4	2023-12-29 21:08:29.296369-05	2023-12-30 21:08:29-05	2	5b84567b7d2848a1aead3431bcf9db6d
18	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcwMzk4ODkxMywiaWF0IjoxNzAzOTAyNTEzLCJqdGkiOiJmMWM4MDkxODc4ZTc0N2MxYjg1MDI1ZGE3M2VhY2E2YSIsInVzZXJfaWQiOjJ9.5iPd0RE6IGMn-SMwxQWe7sdoHKtZCL_eTpdNDg0XWzM	2023-12-29 21:15:13.987389-05	2023-12-30 21:15:13-05	2	f1c8091878e747c1b85025da73eaca6a
19	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcwMzk5MDM4NSwiaWF0IjoxNzAzOTAzOTg1LCJqdGkiOiJlMmU0NDBmYjQ4MmM0NjkxYmVhMGY1NWM1YzVjMTQ0ZSIsInVzZXJfaWQiOjJ9.eSgd9vcN5bAKX3GBXxVETrZkXxnRIfLIb9PX1uNSJJI	2023-12-29 21:39:45.541346-05	2023-12-30 21:39:45-05	2	e2e440fb482c4691bea0f55c5c5c144e
20	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcwMzk5MDc0NSwiaWF0IjoxNzAzOTA0MzQ1LCJqdGkiOiIxYzIyMzMzYmFkYTg0ZTI3YTY5ZGJhYjc3MGJlNmU5MyIsInVzZXJfaWQiOjJ9.veAQAQ6pkkV5Qpj26reol_4gDFJXzeYRUb56mcx95s0	2023-12-29 21:45:45.601494-05	2023-12-30 21:45:45-05	2	1c22333bada84e27a69dbab770be6e93
21	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcwMzk5MDc3MSwiaWF0IjoxNzAzOTA0MzcxLCJqdGkiOiJiY2JhNTNkNzc3OTg0NDc0YWY5MGJmMDAyM2U5NzNkMCIsInVzZXJfaWQiOjJ9.UvuA1lOPPqYW9OCmE4S_BZgjS_jXifhiVBVBOrkGVQM	2023-12-29 21:46:11.823504-05	2023-12-30 21:46:11-05	2	bcba53d777984474af90bf0023e973d0
22	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcwMzk5MDkyNSwiaWF0IjoxNzAzOTA0NTI1LCJqdGkiOiIzNjVhOWJiNzdlNTQ0ZThjYmIwNzQ0ZDZmMmZkY2RhNiIsInVzZXJfaWQiOjJ9.IDeBYLUMtn8m4d7wtZHv5242Fiz3tQscTr4ZYJ0BV7A	2023-12-29 21:48:45.651372-05	2023-12-30 21:48:45-05	2	365a9bb77e544e8cbb0744d6f2fdcda6
23	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcwMzk5MTI0OCwiaWF0IjoxNzAzOTA0ODQ4LCJqdGkiOiJjOGZkY2ZiZjU5Y2Q0MDFlYjVlMjMzMjQ5ZWY2N2VmOSIsInVzZXJfaWQiOjJ9.hd9NJoAJN67aVLLDIFbf5BiVIxxa39PehiuCqN6LHuY	2023-12-29 21:54:08.729256-05	2023-12-30 21:54:08-05	2	c8fdcfbf59cd401eb5e233249ef67ef9
24	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcwMzk5MTQzOSwiaWF0IjoxNzAzOTA1MDM5LCJqdGkiOiIzYTM1YjY3YzY5YmE0YWUyYmZmYWNjOGE0ZGY1ZWQwZSIsInVzZXJfaWQiOjF9.BKtf3h5RWzHpqcXemOLmOuJvYIQKqIPfZJVq5nnTZU8	2023-12-29 21:57:19.722576-05	2023-12-30 21:57:19-05	1	3a35b67c69ba4ae2bffacc8a4df5ed0e
25	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcwNDAzNTY0MSwiaWF0IjoxNzAzOTQ5MjQxLCJqdGkiOiI2YmUyY2Q1NWI2Y2I0ODdkYjI0OWRjZDVkZjViOTg4NCIsInVzZXJfaWQiOjJ9.77hW_03vpphrFvbO_T0Z4saPRE9yzQ4gY1U3cfJVIVM	2023-12-30 10:14:01.866483-05	2023-12-31 10:14:01-05	2	6be2cd55b6cb487db249dcd5df5b9884
26	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcwNDAzNjAzMSwiaWF0IjoxNzAzOTQ5NjMxLCJqdGkiOiJlOTg5ZTJiODQ1YjA0MTE3OWNlNmRmNmJlYjA2OTRmNCIsInVzZXJfaWQiOjJ9.frs8bXdYsyLC4n9ylit0mfHut7cLmrehbTrDaroZcuY	2023-12-30 10:20:31.888402-05	2023-12-31 10:20:31-05	2	e989e2b845b041179ce6df6beb0694f4
27	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcwNDAzNzIyNiwiaWF0IjoxNzAzOTUwODI2LCJqdGkiOiIyN2IzMWFhZGZkYWQ0Yjc3YjE4ZWI0ZTYwYmExMzY5YiIsInVzZXJfaWQiOjJ9.HQpWkSuaDCjdKqozZnY9IOEAjRXL16gOkHrIGefNRTM	2023-12-30 10:40:26.693639-05	2023-12-31 10:40:26-05	2	27b31aadfdad4b77b18eb4e60ba1369b
28	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcwNDAzNzIyNiwiaWF0IjoxNzAzOTUwODI2LCJqdGkiOiJmMmEzMWI2M2Q3NjM0MmI4ODQxMTI4ZWU5YWM3N2UwOSIsInVzZXJfaWQiOjJ9.c242xA_vZwbuMArgEzfB-KXIskobEJlp2q7JhsG9tGw	2023-12-30 10:40:26.746166-05	2023-12-31 10:40:26-05	2	f2a31b63d76342b8841128ee9ac77e09
29	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcwNDAzNzM5NywiaWF0IjoxNzAzOTUwOTk3LCJqdGkiOiJhNmI2MzViNjUxOTk0M2IwYTI3YWFmMWRlMTEyMzQwZCIsInVzZXJfaWQiOjF9.WVowvKwlwrshmM8GHD7AY-ZtEMYJzw2YUlRgiRkJU0g	2023-12-30 10:43:17.94572-05	2023-12-31 10:43:17-05	1	a6b635b6519943b0a27aaf1de112340d
30	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcwNDAzNzU3NCwiaWF0IjoxNzAzOTUxMTc0LCJqdGkiOiJhZGYzYTc4NDU5ZDY0NjJkYjA1MDZlMWI4MTI2MTk5ZiIsInVzZXJfaWQiOjJ9.AQGqUH9eS7c3Oc7fNSWjtbPOaDNZ8kRZObwAoOYoF0c	2023-12-30 10:46:14.060316-05	2023-12-31 10:46:14-05	2	adf3a78459d6462db0506e1b8126199f
31	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcwNDAzODMzOSwiaWF0IjoxNzAzOTUxOTM5LCJqdGkiOiI3NzdmNzYxYmI5ODE0ZGZiYjQzZGFiMTZmNGQzOTJjOCIsInVzZXJfaWQiOjJ9.rr5xRmrM30BFujgbwgNZgccZulj01Ve8SQmvKecP3l8	2023-12-30 10:58:59.374007-05	2023-12-31 10:58:59-05	2	777f761bb9814dfbb43dab16f4d392c8
32	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcwNDAzODM0NywiaWF0IjoxNzAzOTUxOTQ3LCJqdGkiOiJiMzY5NzUxYmY0NzE0MDFmOTU2OGU4MTBhZmMwNGM4NCIsInVzZXJfaWQiOjJ9.m8fu7OvGaDzfKWb7_WTSMjKdhY_GmMVCeda3zPQIqaQ	2023-12-30 10:59:07.755727-05	2023-12-31 10:59:07-05	2	b369751bf471401f9568e810afc04c84
33	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcwNDA3Mzg1MywiaWF0IjoxNzAzOTg3NDUzLCJqdGkiOiJjZjkzYTRiZTg0Mzc0OTU5OGIyODM5MmE2ZmJjMTdmYiIsInVzZXJfaWQiOjJ9.aWK3xPwuNn0ieZ34lyaEuInuI_hbsKhg-5_-e4NQ6yc	2023-12-30 20:50:53.406569-05	2023-12-31 20:50:53-05	2	cf93a4be843749598b28392a6fbc17fb
34	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcwNDA3NzY4NCwiaWF0IjoxNzAzOTkxMjg0LCJqdGkiOiI0NTlmMzVkZmQ5Zjc0ZThmYmFmODM3OTJjOWM0ZjQwNCIsInVzZXJfaWQiOjF9.bBY5mkKs_fzET5Iw2R5vmsBaWL0BEShcPnGApF2XClw	2023-12-30 21:54:44.299924-05	2023-12-31 21:54:44-05	1	459f35dfd9f74e8fbaf83792c9c4f404
35	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcwNDA3Nzc3OCwiaWF0IjoxNzAzOTkxMzc4LCJqdGkiOiJhODI3YmU0OTU3MjA0YWQzOTk0YWJjMjliMTczZjc0OCIsInVzZXJfaWQiOjJ9.mPQ9X_o4kYy9T8Ow0wv-OUcexemxeerGeUVxeeXhIB0	2023-12-30 21:56:18.28355-05	2023-12-31 21:56:18-05	2	a827be4957204ad3994abc29b173f748
36	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcwNDA3Nzc3OCwiaWF0IjoxNzAzOTkxMzc4LCJqdGkiOiJlODNhNTk4OTg5ZDU0ZjYxOTIzODZkYWQxYzBkZDRkMSIsInVzZXJfaWQiOjJ9.G7r6P1kZ6u3uUiPTabI5s61Qkm6sDFuNagF4wLRLGXY	2023-12-30 21:56:18.355533-05	2023-12-31 21:56:18-05	2	e83a598989d54f6192386dad1c0dd4d1
37	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcwNDA3NzgwMiwiaWF0IjoxNzAzOTkxNDAyLCJqdGkiOiI4M2YxM2E3NjRkNGU0YzhiYWE4MTQzNmZjM2UxYjA4ZSIsInVzZXJfaWQiOjJ9.3YvFEhJOnd2Zq3qwAoZX-GwQ1BXLIrMEGJbqk31fMwY	2023-12-30 21:56:42.538544-05	2023-12-31 21:56:42-05	2	83f13a764d4e4c8baa81436fc3e1b08e
38	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcwNDA3NzgwNCwiaWF0IjoxNzAzOTkxNDA0LCJqdGkiOiIwNzU0MGFjZmFjMWY0M2RmOWEwN2I0OTcwYTE5MmU4MSIsInVzZXJfaWQiOjJ9.Ec5-fSZhWlE-lhR_qXd8d2kud0cyj-55X6-JuPQKg7E	2023-12-30 21:56:44.30809-05	2023-12-31 21:56:44-05	2	07540acfac1f43df9a07b4970a192e81
39	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcwNDA3Nzg3MiwiaWF0IjoxNzAzOTkxNDcyLCJqdGkiOiJjMWIyZTgxODEyM2E0YjJjYTg5OTNjOGI5ZjgyOTgxZCIsInVzZXJfaWQiOjJ9.U0NxJpq4Dkh5yvKcKrD3NKqxmXUaWekBPkVjb_CIIlw	2023-12-30 21:57:52.5932-05	2023-12-31 21:57:52-05	2	c1b2e818123a4b2ca8993c8b9f82981d
40	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcwNDA3Nzg4MCwiaWF0IjoxNzAzOTkxNDgwLCJqdGkiOiJlYTdiOGU5YjM3NDY0ZjhhODg0NDU4NzJiYzE3MDc5MyIsInVzZXJfaWQiOjJ9.JKuTqV0B_nDrgZl98MA8tlUrc2ihiIE8AWVeVTLDTOY	2023-12-30 21:58:00.823908-05	2023-12-31 21:58:00-05	2	ea7b8e9b37464f8a88445872bc170793
41	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcwNDA3Nzg5OSwiaWF0IjoxNzAzOTkxNDk5LCJqdGkiOiJjNTliODk2MWUxOGE0Y2QxYThjNWVkMjdiMjhmMDViNSIsInVzZXJfaWQiOjJ9.iCrhy7WeY1RGa7yPXwh6_Nv6_MApCmq965xaG2EZpcM	2023-12-30 21:58:19.206296-05	2023-12-31 21:58:19-05	2	c59b8961e18a4cd1a8c5ed27b28f05b5
42	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcwNDA3NzkxMSwiaWF0IjoxNzAzOTkxNTExLCJqdGkiOiI5MWFkZWM1N2Q4OWU0NjgzOGVhODgzZTYxYWZkZmFlNCIsInVzZXJfaWQiOjJ9.e1ZLQQQHUpu3vs9gY3jQRHrkvABJi4njzLVUafHR6Ag	2023-12-30 21:58:31.134841-05	2023-12-31 21:58:31-05	2	91adec57d89e46838ea883e61afdfae4
43	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcwNDA3NzkxMSwiaWF0IjoxNzAzOTkxNTExLCJqdGkiOiI1M2Q3MDZmN2QwZDA0Y2I1ODQwNjljZjk3NjgwMmFjMCIsInVzZXJfaWQiOjJ9.MrDay_oDUbJ6aQcZ8DTm-zGdhoIqC2kTSxK8MEhB36M	2023-12-30 21:58:31.16141-05	2023-12-31 21:58:31-05	2	53d706f7d0d04cb584069cf976802ac0
44	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcwNDA3NzkxMiwiaWF0IjoxNzAzOTkxNTEyLCJqdGkiOiI1ODBlMjgyN2NlZmE0Y2UwOWQzOGNiYjVmM2Y3NDY1YiIsInVzZXJfaWQiOjJ9.a9yIxcXulvzeRBFw6BsX8lRo84YTkNwDj2Retf9wXbA	2023-12-30 21:58:32.600332-05	2023-12-31 21:58:32-05	2	580e2827cefa4ce09d38cbb5f3f7465b
45	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcwNDA3NzkxMiwiaWF0IjoxNzAzOTkxNTEyLCJqdGkiOiJmZDRhNjRkYjJiOWE0YjU2ODI5YmZhNDdhZGNiMGVmZSIsInVzZXJfaWQiOjJ9.GKQyvrImPM15-TQhLpzRpWnGXB8JWT6G2cKGTo0e7DA	2023-12-30 21:58:32.72377-05	2023-12-31 21:58:32-05	2	fd4a64db2b9a4b56829bfa47adcb0efe
46	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcwNDA3ODUyNiwiaWF0IjoxNzAzOTkyMTI2LCJqdGkiOiJhNDRmMmM0OWE4ZmM0MTgyYjMxMmY2ODRjMzUyZDg0YSIsInVzZXJfaWQiOjF9.BcW7jHykyiCFvQ5oPkh4TXCwa6UV819K3w8azBuBqPY	2023-12-30 22:08:46.542291-05	2023-12-31 22:08:46-05	1	a44f2c49a8fc4182b312f684c352d84a
47	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcwNDI5NTA3MSwiaWF0IjoxNzA0MjA4NjcxLCJqdGkiOiJlMjllOGE0MjBkZTg0ODU0YWQ0MmVjM2RjN2QyNjhmMSIsInVzZXJfaWQiOjJ9.FkcFhXBgNUlHbcq96hV9JSIyl7d907zmCOQviE0fvds	2024-01-02 10:17:51.752191-05	2024-01-03 10:17:51-05	2	e29e8a420de84854ad42ec3dc7d268f1
48	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcwNDI5NTY2MiwiaWF0IjoxNzA0MjA5MjYyLCJqdGkiOiIxYTY2NzZjMGViYWY0YzYxODAwZmEwMzAwZWVlNTQ2MSIsInVzZXJfaWQiOjJ9.IhOk1BZOHf4n5qNsFamCg37hpli88HEmgIR_b6kcb0g	2024-01-02 10:27:42.278894-05	2024-01-03 10:27:42-05	2	1a6676c0ebaf4c61800fa0300eee5461
49	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcwNDI5NTk3MCwiaWF0IjoxNzA0MjA5NTcwLCJqdGkiOiJjNGMxZWIyOTRjOWM0MDgwOGVlMGRhOWZhNzUzNGQzMSIsInVzZXJfaWQiOjJ9.DkyYuKGwHtg5a_piP5_8F_Agv2F4QSBd3vKA10vuzgA	2024-01-02 10:32:50.920483-05	2024-01-03 10:32:50-05	2	c4c1eb294c9c40808ee0da9fa7534d31
50	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcwNDI5NjEzOCwiaWF0IjoxNzA0MjA5NzM4LCJqdGkiOiI1NzJjNmZjODUxMjE0ZTg1YmEzOTYyMDc2NjlmNDMzOSIsInVzZXJfaWQiOjF9.gfGMm0Fq7ZYefmHr2orJeY1hrOautIerqUppf7zxkiw	2024-01-02 10:35:38.003691-05	2024-01-03 10:35:38-05	1	572c6fc851214e85ba396207669f4339
51	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcwNDI5NzEzMSwiaWF0IjoxNzA0MjEwNzMxLCJqdGkiOiI0MmY3YTUxZDA2NDQ0OWQ2OTVkOWZjODgyMzQ5MDY2YSIsInVzZXJfaWQiOjJ9.njGNYH-Xkb6Bma8BTPii8hhbMaP3Sor55LeY5RWRbT8	2024-01-02 10:52:11.560519-05	2024-01-03 10:52:11-05	2	42f7a51d064449d695d9fc882349066a
52	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcwNDMzMzU5NCwiaWF0IjoxNzA0MjQ3MTk0LCJqdGkiOiIwYjdmNGQ4OWNiNWI0YWVkYjQzODU5NDZmOGRiOGM2NSIsInVzZXJfaWQiOjJ9.xyS71pqnYbeIK_boycYVQ9Zt65TkJGvphSoNqnGzoi0	2024-01-02 20:59:54.225936-05	2024-01-03 20:59:54-05	2	0b7f4d89cb5b4aedb4385946f8db8c65
53	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcwNDMzNTM5NCwiaWF0IjoxNzA0MjQ4OTk0LCJqdGkiOiJiYjMxMTcyNzVmYTg0M2MyODY2N2IzNjNjMDRmMTQ5OCIsInVzZXJfaWQiOjJ9.NLboiN6uhvzqLoazG_-1VLaFoUtiCie7tEb8Qt1BpSQ	2024-01-02 21:29:54.256474-05	2024-01-03 21:29:54-05	2	bb3117275fa843c28667b363c04f1498
54	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcwNDMzNTk2MywiaWF0IjoxNzA0MjQ5NTYzLCJqdGkiOiI4ODA5MDBlZjBiYmM0OGFiYWRjNWJmZGE1ZmRkMDRmNSIsInVzZXJfaWQiOjJ9.44zFlyKN2mEYx3J3ehdqLzBoCk8WgFXdzNGQKRzrFjE	2024-01-02 21:39:23.347859-05	2024-01-03 21:39:23-05	2	880900ef0bbc48abadc5bfda5fdd04f5
55	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcwNDMzNjI2OCwiaWF0IjoxNzA0MjQ5ODY4LCJqdGkiOiJkMWMxNmU2MzQzYmY0YzQ2ODI3NmYzMGVjMzkzN2FlMyIsInVzZXJfaWQiOjJ9.QKgr3EsQzmzQ78xMPDp1lKrGez2vSIk5DXyO0hO8tPE	2024-01-02 21:44:28.878279-05	2024-01-03 21:44:28-05	2	d1c16e6343bf4c468276f30ec3937ae3
56	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcwNDMzNjQwOCwiaWF0IjoxNzA0MjUwMDA4LCJqdGkiOiJjNTViOTFlMWJiNDg0OTI0ODk4YzlhZjgwNDg2NmRlNiIsInVzZXJfaWQiOjF9.0fHwF2hAyUaliW0ugUsuqdOQmaypztNVakHTmuCvD0E	2024-01-02 21:46:48.053775-05	2024-01-03 21:46:48-05	1	c55b91e1bb484924898c9af804866de6
57	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcwNDMzNjcwNSwiaWF0IjoxNzA0MjUwMzA1LCJqdGkiOiJkNGJlM2IwNzZjMDQ0N2VhOTk3OGQ3NzAxM2ZjYjEzOSIsInVzZXJfaWQiOjF9.1WVn2WNEia4n3wANLo5DLTYYauDZcqJXyat4zKg8NlQ	2024-01-02 21:51:45.620391-05	2024-01-03 21:51:45-05	1	d4be3b076c0447ea9978d77013fcb139
58	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcwNDMzNjg2MiwiaWF0IjoxNzA0MjUwNDYyLCJqdGkiOiJhNGFmYTZmNDk0ZDA0MjRhOTI0NWIwNWUxYTliODRjNCIsInVzZXJfaWQiOjJ9.FfhCP8Br_IZYF-Hua6QxBiuHXxxcaYe9UCPWADgmzcE	2024-01-02 21:54:22.346754-05	2024-01-03 21:54:22-05	2	a4afa6f494d0424a9245b05e1a9b84c4
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
8	Juan	Reynoso	t	987564231		Pidio un asesor personal	2023-10-04 00:00:00-05	t	t	2023-12-29	\N	1	1	A	EP	1	1	1
6	Jesus		t	958742315			2023-12-29 18:34:47.913955-05	t	t	2023-12-29	\N	1	2	A	EP	1	1	1
3	Tony Hawk		f	958742315			2023-12-29 18:33:45-05	t	t	2024-01-02	\N	\N	2	A	EP	1	1	1
10	Paul Rodiguez		t	934789123			2023-12-29 18:35:30-05	t	t	2024-01-02	2024-01-02 10:57:37-05	1	3	A	EP	1	1	1
9	Jesus	Begazo	t	958742315			2023-12-29 18:35:30-05	t	t	2024-01-02	2024-01-02 10:57:51-05	1	2	A	EP	1	1	1
7	Aaron	Homoki	t	934789123			2023-12-29 18:34:47-05	t	t	2024-01-02	\N	1	3	A	EP	1	1	1
5	Boulala	aaaaaaa	t	999875468		Pidio un asesor personal	2023-10-04 00:00:00-05	t	t	2024-01-02	\N	1	1	A	EP	1	1	1
4	Eric	Coston	t	934789123			2023-12-29 18:33:45-05	t	t	2024-01-02	\N	1	3	A	EP	1	1	1
2	Luan	Oliveira	t	999875468		Pidio un asesor personal	2023-10-04 00:00:00-05	t	t	2024-01-02	\N	1	1	A	EP	1	1	1
1	BRIAN	VELASCO	t	935488033			2023-12-29 15:54:52-05	t	t	2024-01-02	\N	1	1	A	NR	1	1	1
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
1	Firma del contrato de socabaya	50	2023-12-29 22:12:30-05	socabaya		2023-12-30	2023-12-29 22:13:24-05	2	A	1	1	1	2	1
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
1	llamada larga	2024-01-02	2024-01-02 10:53:25-05	A	1	2	2
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
1	Hola, le hablo por el depa de socabaya	2024-01-02	2024-01-02 09:55:00-05	A	1	1	1
2	Hola le preguntaba por el depa soy Brian	2024-01-02	\N	A	1	1	1
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

