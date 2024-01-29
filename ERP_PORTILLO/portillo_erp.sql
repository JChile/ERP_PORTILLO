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
1	asesor
4	jefe_ventas
3	recursos_humanos
2	marketing
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
15	ventas	objecion
16	ventas	whatsapp
17	ventas	tipoproducto
18	ventas	tipoevento
19	ventas	tipocuota
20	ventas	tipocotizacion
21	ventas	proyectotipoproducto
22	ventas	producto
23	ventas	precio
24	ventas	llamada
25	ventas	historicoleadasesor
26	ventas	evento
27	ventas	cuota
28	token_blacklist	blacklistedtoken
29	token_blacklist	outstandingtoken
31	ventas	estadoevento
32	ventas	desasignacionleadasesor
33	ventas	videoproyecto
34	ventas	imagenproducto
35	ventas	videoproducto
36	ventas	imagenproyecto
37	multimedia	videoproducto
38	multimedia	imagenproducto
39	multimedia	videoproyecto
40	multimedia	imagenproyecto
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
57	Can add objecion	15	add_objecion
58	Can change objecion	15	change_objecion
59	Can delete objecion	15	delete_objecion
60	Can view objecion	15	view_objecion
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
121	Can add estado evento	31	add_estadoevento
122	Can change estado evento	31	change_estadoevento
123	Can delete estado evento	31	delete_estadoevento
124	Can view estado evento	31	view_estadoevento
125	Can add desasignacion lead asesor	32	add_desasignacionleadasesor
126	Can change desasignacion lead asesor	32	change_desasignacionleadasesor
127	Can delete desasignacion lead asesor	32	delete_desasignacionleadasesor
128	Can view desasignacion lead asesor	32	view_desasignacionleadasesor
129	Can add video proyecto	33	add_videoproyecto
130	Can change video proyecto	33	change_videoproyecto
131	Can delete video proyecto	33	delete_videoproyecto
132	Can view video proyecto	33	view_videoproyecto
133	Can add imagen producto	34	add_imagenproducto
134	Can change imagen producto	34	change_imagenproducto
135	Can delete imagen producto	34	delete_imagenproducto
136	Can view imagen producto	34	view_imagenproducto
137	Can add video producto	35	add_videoproducto
138	Can change video producto	35	change_videoproducto
139	Can delete video producto	35	delete_videoproducto
140	Can view video producto	35	view_videoproducto
141	Can add imagen proyecto	36	add_imagenproyecto
142	Can change imagen proyecto	36	change_imagenproyecto
143	Can delete imagen proyecto	36	delete_imagenproyecto
144	Can view imagen proyecto	36	view_imagenproyecto
145	Can add video producto	37	add_videoproducto
146	Can change video producto	37	change_videoproducto
147	Can delete video producto	37	delete_videoproducto
148	Can view video producto	37	view_videoproducto
149	Can add imagen producto	38	add_imagenproducto
150	Can change imagen producto	38	change_imagenproducto
151	Can delete imagen producto	38	delete_imagenproducto
152	Can view imagen producto	38	view_imagenproducto
153	Can add video proyecto	39	add_videoproyecto
154	Can change video proyecto	39	change_videoproyecto
155	Can delete video proyecto	39	delete_videoproyecto
156	Can view video proyecto	39	view_videoproyecto
157	Can add imagen proyecto	40	add_imagenproyecto
158	Can change imagen proyecto	40	change_imagenproyecto
159	Can delete imagen proyecto	40	delete_imagenproyecto
160	Can view imagen proyecto	40	view_imagenproyecto
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
50	1	56
52	3	33
53	3	34
54	3	35
55	3	36
56	3	81
57	3	82
58	3	83
59	3	84
60	2	57
61	2	58
62	2	59
63	2	60
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
4	Gestión de productos	producto	21	A
\.


--
-- Data for Name: cuenta_user; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.cuenta_user (id, password, last_login, is_superuser, username, first_name, last_name, email, is_staff, is_active, date_joined, "codigoAsesor", "isAdmin", estado_id) FROM stdin;
4	pbkdf2_sha256$600000$YMRUCRdJBJEVYauyw9WQAE$g68ooYvf5/vuJpdaTzIMpqE0NDXFEFc0fm0sFGygj8Y=	\N	f	ingcocoliso	Cocoliso Javier	Luna Mendoza	ingecocoliso@gmail.com	f	f	2024-01-08 03:15:13.775409-05	\N	t	A
8	pbkdf2_sha256$600000$rVJXkccBURbesrplFCaMFw$ZORjOdYQaYmONboyDbUyFy1v0taXh6ECjNp3j5crk3M=	\N	f	Testing123	Testing	Testingtest	test@gmail.com	f	f	2024-01-14 12:37:53.098732-05	asesor_c	t	A
3	pbkdf2_sha256$600000$klVf2T6ADjhRpycBvEt8mp$AqHTHE0zXd/LS2/HgIt5bp7hsUGFWm0qJuRp7xPbz9A=	\N	f	jesus	Jesus	begazo	jbegazoti@unsa.edu.pe	t	t	2024-01-05 14:56:34.558953-05	\N	f	\N
5	pbkdf2_sha256$600000$eFY64burZuoRW4a8iFyxbz$2haFq4kNsK3VmT8ejkH9IJY0d5oWM8A0xrA6QQ5VoJg=	\N	f	Frego	Fredy	Gonzales	frego@unsa.edu.pe	f	t	2024-01-10 01:51:38.863717-05	\N	t	A
6	pbkdf2_sha256$600000$2HH7y5sjG3wcF33dPaS8nd$pU+VxzzAO0L6TzU/3uoduphmvMbpHI5dOZ9LcoBtOyA=	\N	f	diegoportillo	Diego Moises	Chuctaya Ruiz	diego@unsa.edu.pe	f	t	2024-01-10 01:52:32.216899-05	\N	t	A
1	pbkdf2_sha256$600000$BMJ8LF8DGDtK75g1jlAJbH$pvS/k25Y+f0BUQQBOycCYkIImuQJm/vZkxb3UI3Qpzg=	2024-01-24 23:18:00.789623-05	t	andrew	Andrew	Jacobo Castillo	ajacoboc@unsa.edu.pe	t	t	2023-12-29 14:19:22-05	\N	t	A
2	pbkdf2_sha256$600000$Ntgg4ISllhxBbS1dKBkaxF$NDEQuIj95L9YZlaRkumq6mh4nhjUnNnndDsjMahaQj8=	2024-01-24 23:20:23.360813-05	t	qwerty	Brian	Gomez Velasco	bgomezvel@unsa.edu.pe	t	t	2023-12-29 14:19:38-05	\N	t	A
9	pbkdf2_sha256$600000$W644Q9TiajsQx9aYK2zlXA$r5oxIWJrZH7ihley5Z8NJhlompoLqwHGzinCxpc5n/8=	\N	f	julian				f	t	2024-01-25 13:57:28.296243-05	\N	f	A
\.


--
-- Data for Name: cuenta_user_groups; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.cuenta_user_groups (id, user_id, group_id) FROM stdin;
10	3	3
19	2	4
23	4	2
24	5	4
26	1	4
28	6	2
37	8	1
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
54	2024-01-02 22:46:43.170372-05	2	qwerty	2	[{"changed": {"fields": ["Proyecto"]}}]	8	2
55	2024-01-02 22:46:47.330962-05	1	andrew	2	[{"changed": {"fields": ["Proyecto"]}}]	8	2
56	2024-01-03 10:46:31.557664-05	1	Pago Contado	1	[{"added": {}}]	19	2
57	2024-01-03 10:46:42.195088-05	1	Pago Contado Socabay	1	[{"added": {}}]	12	2
58	2024-01-03 10:46:53.750821-05	1	Pago Contado Socabaya	2	[{"changed": {"fields": ["Nombre", "Fecha", "Duracion"]}}]	12	2
59	2024-01-03 10:50:46.333158-05	1	Departamento	1	[{"added": {}}]	16	2
60	2024-01-03 10:50:57.756241-05	1	Departamento socabaya	1	[{"added": {}}]	21	2
61	2024-01-05 12:52:56.098364-05	2	qwerty	2	[{"changed": {"fields": ["Superuser status"]}}]	8	2
62	2024-01-05 12:54:09.13136-05	1	asesor	2	[{"changed": {"fields": ["Permissions"]}}]	3	1
63	2024-01-05 12:54:56.215115-05	4	jefe_ventas	2	[{"changed": {"fields": ["Permissions"]}}]	3	1
64	2024-01-05 12:55:45.879304-05	2	qwerty	2	[{"changed": {"fields": ["User permissions"]}}]	8	1
65	2024-01-05 13:08:50.236206-05	4	jefe_ventas	2	[{"changed": {"fields": ["Permissions"]}}]	3	1
66	2024-01-05 13:09:17.675614-05	4	jefe_ventas	2	[{"changed": {"fields": ["Permissions"]}}]	3	1
67	2024-01-05 13:57:39.181609-05	2	qwerty	2	[{"changed": {"fields": ["IsAdmin"]}}]	8	1
68	2024-01-05 13:58:14.896279-05	4	jefe_ventas	2	[{"changed": {"fields": ["Permissions"]}}]	3	1
69	2024-01-05 13:59:02.705732-05	4	jefe_ventas	2	[{"changed": {"fields": ["Permissions"]}}]	3	1
70	2024-01-05 13:59:23.177854-05	2	qwerty	2	[{"changed": {"fields": ["IsAdmin"]}}]	8	1
71	2024-01-05 14:01:30.285339-05	2	qwerty	2	[{"changed": {"fields": ["Superuser status"]}}]	8	1
72	2024-01-05 14:01:47.649552-05	2	qwerty	2	[{"changed": {"fields": ["IsAdmin"]}}]	8	1
73	2024-01-05 14:02:52.213134-05	4	jefe_ventas	2	[{"changed": {"fields": ["Permissions"]}}]	3	1
74	2024-01-05 14:09:28.871164-05	2	qwerty	2	[{"changed": {"fields": ["Superuser status"]}}]	8	1
75	2024-01-05 14:10:05.057022-05	4	jefe_ventas	2	[{"changed": {"fields": ["Permissions"]}}]	3	1
76	2024-01-05 14:10:46.751912-05	2	qwerty	2	[{"changed": {"fields": ["Superuser status"]}}]	8	1
77	2024-01-05 14:10:59.470942-05	2	qwerty	2	[{"changed": {"fields": ["IsAdmin"]}}]	8	1
78	2024-01-05 14:11:12.880363-05	2	qwerty	2	[{"changed": {"fields": ["Superuser status"]}}]	8	1
79	2024-01-05 14:11:24.531448-05	2	qwerty	2	[{"changed": {"fields": ["Superuser status", "Groups"]}}]	8	1
80	2024-01-05 14:11:37.811745-05	2	qwerty	2	[{"changed": {"fields": ["Superuser status"]}}]	8	1
81	2024-01-05 14:11:50.101689-05	2	qwerty	2	[{"changed": {"fields": ["Groups"]}}]	8	1
82	2024-01-05 14:12:01.630879-05	2	qwerty	2	[{"changed": {"fields": ["IsAdmin"]}}]	8	1
83	2024-01-05 14:12:11.213272-05	2	qwerty	2	[{"changed": {"fields": ["Superuser status"]}}]	8	1
84	2024-01-05 14:32:11.284433-05	2	qwerty	2	[{"changed": {"fields": ["IsAdmin"]}}]	8	1
85	2024-01-05 14:33:05.318089-05	1	asesor	2	[{"changed": {"fields": ["Permissions"]}}]	3	1
86	2024-01-05 14:33:28.842261-05	2	qwerty	2	[{"changed": {"fields": ["Superuser status"]}}]	8	1
87	2024-01-05 14:34:06.72347-05	1	asesor	2	[{"changed": {"fields": ["Permissions"]}}]	3	1
88	2024-01-05 14:39:14.510335-05	2	qwerty	2	[{"changed": {"fields": ["IsAdmin"]}}]	8	1
89	2024-01-05 14:45:30.613673-05	2	qwerty	2	[{"changed": {"fields": ["Superuser status"]}}]	8	1
90	2024-01-05 14:46:34.31225-05	2	qwerty	2	[{"changed": {"fields": ["IsAdmin"]}}]	8	1
91	2024-01-05 14:47:18.242923-05	1	Firma del contrato de socabaya	2	[{"changed": {"fields": ["Asesor"]}}]	26	1
92	2024-01-05 14:47:32.569914-05	1	Firma del contrato de socabaya	2	[{"changed": {"fields": ["Asesor"]}}]	26	1
93	2024-01-05 14:57:43.438211-05	2	qwerty	2	[{"changed": {"fields": ["Superuser status"]}}]	8	1
94	2024-01-05 14:57:58.264727-05	2	qwerty	2	[{"changed": {"fields": ["IsAdmin"]}}]	8	1
95	2024-01-05 14:58:20.742686-05	2	qwerty	2	[{"changed": {"fields": ["Groups"]}}]	8	1
96	2024-01-05 14:58:53.216346-05	4	jefe_ventas	2	[{"changed": {"fields": ["Permissions"]}}]	3	1
97	2024-01-05 14:59:23.221808-05	2	qwerty	2	[{"changed": {"fields": ["IsAdmin"]}}]	8	1
98	2024-01-05 15:02:09.640605-05	2	qwerty	2	[{"changed": {"fields": ["Superuser status", "IsAdmin"]}}]	8	1
99	2024-01-08 04:43:01.549884-05	2	qwerty	2	[{"changed": {"fields": ["Superuser status"]}}]	8	1
100	2024-01-08 04:43:20.009885-05	2	qwerty	2	[{"changed": {"fields": ["Superuser status"]}}]	8	1
101	2024-01-10 13:10:29.419097-05	1	Gestión de proyectos	1	[{"added": {}}]	7	1
102	2024-01-10 13:11:50.905269-05	4	Gestión de productos	1	[{"added": {}}]	7	1
103	2024-01-14 12:24:09.360259-05	7	testing	3		8	1
104	2024-01-14 12:44:37.082539-05	2	qwerty	2	[{"changed": {"fields": ["CodigoAsesor"]}}]	8	1
105	2024-01-14 12:47:14.259695-05	2	qwerty	2	[{"changed": {"fields": ["CodigoAsesor"]}}]	8	1
106	2024-01-14 12:50:30.758331-05	2	qwerty	2	[{"changed": {"fields": ["CodigoAsesor"]}}]	8	1
107	2024-01-24 21:38:33.445805-05	2	qwerty	2	[{"changed": {"fields": ["Active"]}}]	8	1
108	2024-01-24 21:39:23.809748-05	1	Llamada object (1)	1	[{"added": {}}]	24	2
109	2024-01-24 21:39:47.187168-05	2	Llamada object (2)	1	[{"added": {}}]	24	2
110	2024-01-24 21:40:16.995839-05	1	WhatsApp object (1)	1	[{"added": {}}]	16	2
111	2024-01-24 21:40:36.423214-05	2	WhatsApp object (2)	1	[{"added": {}}]	16	2
112	2024-01-24 21:50:19.618964-05	2	Llamada object (2)	2	[{"changed": {"fields": ["Objeciones"]}}]	24	2
113	2024-01-24 21:51:42.900189-05	1	Llamada object (1)	2	[{"changed": {"fields": ["Objeciones"]}}]	24	2
114	2024-01-24 21:51:47.591075-05	2	Llamada object (2)	2	[{"changed": {"fields": ["Objeciones"]}}]	24	2
115	2024-01-24 22:42:26.512066-05	En curso	En curso	1	[{"added": {}}]	31	2
116	2024-01-24 22:42:28.552784-05	1	Firma del contrato de socabaya	2	[{"changed": {"fields": ["EstadoEvento"]}}]	26	2
117	2024-01-24 22:42:50.973258-05	1	Firma del contrato de socabaya	2	[{"changed": {"fields": ["Fecha visita"]}}]	26	2
118	2024-01-25 15:21:13.488269-05	1	BRIAN-935488033	2	[{"changed": {"fields": ["Asesor"]}}]	14	2
119	2024-01-25 15:22:02.733778-05	1	BRIAN-935488033	2	[{"changed": {"fields": ["Asesor", "UsuarioCreador"]}}]	14	2
120	2024-01-25 15:22:25.67813-05	1	BRIAN-935488033	2	[{"changed": {"fields": ["Asesor"]}}]	14	2
121	2024-01-25 15:22:32.05608-05	1	BRIAN-935488033	2	[]	14	2
122	2024-01-25 15:23:35.506403-05	9	Jesus-958742315	2	[{"changed": {"fields": ["Asesor"]}}]	14	2
123	2024-01-25 15:23:45.105752-05	10	-934789123	2	[{"changed": {"fields": ["Asesor"]}}]	14	2
124	2024-01-25 15:24:02.379487-05	3	Jesus-958742315	2	[{"changed": {"fields": ["Asesor"]}}]	14	2
125	2024-01-26 18:50:36.62953-05	1	ImagenProyecto object (1)	1	[{"added": {}}]	40	2
126	2024-01-26 18:58:37.053816-05	1	ImagenProducto object (1)	1	[{"added": {}}]	38	2
127	2024-01-26 18:58:45.850536-05	2	ImagenProducto object (2)	1	[{"added": {}}]	38	2
128	2024-01-26 18:58:52.884382-05	2	ImagenProducto object (2)	2	[]	38	2
129	2024-01-26 18:58:56.476696-05	1	ImagenProducto object (1)	2	[]	38	2
130	2024-01-26 19:05:46.591833-05	2	ImagenProducto object (2)	2	[{"changed": {"fields": ["Imagen"]}}]	38	2
131	2024-01-26 19:05:56.150982-05	1	ImagenProducto object (1)	2	[{"changed": {"fields": ["Imagen"]}}]	38	2
132	2024-01-26 19:07:41.283994-05	1	ImagenProyecto object (1)	2	[{"changed": {"fields": ["Imagen"]}}]	40	2
133	2024-01-26 19:07:49.321214-05	1	ImagenProyecto object (1)	2	[{"changed": {"fields": ["Imagen"]}}]	40	2
134	2024-01-26 19:24:58.468695-05	1	ImagenProducto object (1)	2	[{"changed": {"fields": ["Imagen"]}}]	38	2
\.


--
-- Data for Name: django_migrations; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.django_migrations (id, app, name, applied) FROM stdin;
1	contenttypes	0001_initial	2024-01-24 18:17:25.5109-05
2	contenttypes	0002_remove_content_type_name	2024-01-24 18:17:25.544191-05
3	auth	0001_initial	2024-01-24 18:17:25.643079-05
4	auth	0002_alter_permission_name_max_length	2024-01-24 18:17:25.654904-05
5	auth	0003_alter_user_email_max_length	2024-01-24 18:17:25.679439-05
6	auth	0004_alter_user_username_opts	2024-01-24 18:17:25.703297-05
7	auth	0005_alter_user_last_login_null	2024-01-24 18:17:25.715318-05
8	auth	0006_require_contenttypes_0002	2024-01-24 18:17:25.719815-05
9	auth	0007_alter_validators_add_error_messages	2024-01-24 18:17:25.732903-05
10	auth	0008_alter_user_username_max_length	2024-01-24 18:17:25.764184-05
11	auth	0009_alter_user_last_name_max_length	2024-01-24 18:17:25.796693-05
12	auth	0010_alter_group_name_max_length	2024-01-24 18:17:25.822708-05
13	auth	0011_update_proxy_permissions	2024-01-24 18:17:25.860756-05
14	auth	0012_alter_user_first_name_max_length	2024-01-24 18:17:25.8819-05
15	cuenta	0001_initial	2024-01-24 18:17:26.048518-05
16	admin	0001_initial	2024-01-24 18:17:26.127487-05
17	admin	0002_logentry_remove_auto_add	2024-01-24 18:17:26.165133-05
18	admin	0003_logentry_add_action_flag_choices	2024-01-24 18:17:26.195542-05
19	marketing	0001_initial	2024-01-24 18:17:26.370292-05
20	sessions	0001_initial	2024-01-24 18:17:26.392324-05
21	token_blacklist	0001_initial	2024-01-24 18:17:26.467476-05
22	token_blacklist	0002_outstandingtoken_jti_hex	2024-01-24 18:17:26.492255-05
23	token_blacklist	0003_auto_20171017_2007	2024-01-24 18:17:26.528706-05
24	token_blacklist	0004_auto_20171017_2013	2024-01-24 18:17:26.568364-05
25	token_blacklist	0005_remove_outstandingtoken_jti	2024-01-24 18:17:26.611666-05
26	token_blacklist	0006_auto_20171017_2113	2024-01-24 18:17:26.643904-05
27	token_blacklist	0007_auto_20171017_2214	2024-01-24 18:17:26.723711-05
28	token_blacklist	0008_migrate_to_bigautofield	2024-01-24 18:17:26.831942-05
29	token_blacklist	0010_fix_migrate_to_bigautofield	2024-01-24 18:17:26.873826-05
30	token_blacklist	0011_linearizes_history	2024-01-24 18:17:26.876882-05
31	token_blacklist	0012_alter_outstandingtoken_user	2024-01-24 18:17:26.976377-05
32	ventas	0001_initial	2024-01-24 18:17:27.916617-05
41	ventas	0002_estadoevento_evento_estadoevento	2024-01-24 18:18:51.895231-05
42	ventas	0003_remove_evento_proyecto_remove_evento_ubicacion	2024-01-24 18:19:16.526529-05
43	ventas	0004_rename_objeciones_llamada_objecion_and_more	2024-01-24 21:54:44.083442-05
44	ventas	0005_rename_descripcion_evento_observacion	2024-01-24 22:20:46.171445-05
45	ventas	0006_evento_separado	2024-01-24 22:26:07.218902-05
46	ventas	0007_alter_estadoevento_nombre	2024-01-24 22:42:05.253018-05
47	ventas	0008_desasignacionleadasesor	2024-01-24 22:49:22.126577-05
48	ventas	0009_videoproyecto_videoproducto_imagenproyecto_and_more	2024-01-25 19:23:33.563318-05
49	ventas	0010_delete_imagenproducto	2024-01-25 19:25:45.037065-05
50	ventas	0011_remove_videoproducto_producto_and_more	2024-01-25 19:25:45.129612-05
51	multimedia	0001_initial	2024-01-25 19:34:55.424175-05
52	multimedia	0002_alter_imagenproducto_imagen_and_more	2024-01-26 19:04:59.290762-05
53	multimedia	0003_alter_imagenproducto_imagen_and_more	2024-01-26 19:23:42.769245-05
54	ventas	0002_lead_fecha_asginado	2024-01-27 18:14:08.044371-05
55	ventas	0003_remove_lead_fecha_asginado	2024-01-27 18:39:47.215579-05
\.


--
-- Data for Name: django_session; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.django_session (session_key, session_data, expire_date) FROM stdin;
venlcd4mrtw4xx6bfmwqshwjmwbnt8w4	.eJxVjDsOwjAQBe_iGln-JV5T0nOGaL27IQFkS3FSIe4OkVJA-2bmvdSA2zoNW5NlmFmdlVWn3y0jPaTsgO9YblVTLesyZ70r-qBNXyvL83K4fwcTtulbZ0tiEjFEL9GnPmGMPdDIjjN00UGGFIC8dzaK4wA9BkMmWOjGUQyr9wfdYjeP:1rLoO3:LBbHkRdwwW8Ru7nIa6hjsYCFCG-piMilSJ5ewqEQIYA	2024-01-19 12:53:39.63397-05
ic83asz0faoq6oa9p1lv9xlbltm9mrrw	.eJxVjDsOwjAQBe_iGln-JV5T0nOGaL27IQFkS3FSIe4OkVJA-2bmvdSA2zoNW5NlmFmdlVWn3y0jPaTsgO9YblVTLesyZ70r-qBNXyvL83K4fwcTtulbZ0tiEjFEL9GnPmGMPdDIjjN00UGGFIC8dzaK4wA9BkMmWOjGUQyr9wfdYjeP:1rM6Fg:0Luj5J_Q2_qDZciCr9ENxgAC6SMZ0d5HD3HvTIufz_M	2024-01-20 07:58:12.43285-05
a10ed6r80f03b511burqx3bxkyyp3irh	.eJxVjDsOwjAQBe_iGlnxP6ak5wzWZneNA8iW4qRC3B0ipYD2zcx7iQTbWtLWeUkzibPQ4vS7TYAPrjugO9Rbk9jqusyT3BV50C6vjfh5Ody_gwK9fOuoRg5ORySyYHVgT07lTMpkcsgUCA2GaCDoPGD2HDWOExkbwQcasnh_AP9sONw:1rSrDz:iPyd-GBIBkofC0ZzzHoHPIBL5UHGjfr7mY5026ouaxs	2024-02-07 23:20:23.363206-05
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
2	Alamos Facebook	facebook_alamos	2023-12-29 18:26:49.430875-05	2023-12-29	2023-12-29	0	0		2023-12-29 18:26:42-05	1	A	2	2	2
3	Socabaya fisico	fisico_socabaya	2023-12-29 18:27:33.332633-05	2023-12-29	2023-12-29	0	0		2023-12-29 18:27:32-05	2	A	1	2	2
4	Campaña fisica Alamos	campañafisicaalamos_fisico_1_4	2024-01-10 03:51:57.485892-05	2024-01-10	2024-01-31	1401.45	1889.45	Campaña física para el proyecto Alamos	\N	2	A	2	\N	\N
1	Socabaya Faceook	facebook_socabaya	2024-01-14 00:33:02.791326-05	2023-12-29	2023-12-29	67.45	90.5	Esta campaña esta enfocada en la recolección de lead para el proyecto Socabaya por medio de la red social Facebook	2024-01-14 00:33:02-05	1	A	1	3	1
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
1	Departamento socabaya	001	2	4	2024-01-03	2024-01-03 10:50:57-05	A	1	1	2	2
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
33	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcwNDMzOTc2NiwiaWF0IjoxNzA0MjUzMzY2LCJqdGkiOiI5ZDdkZDU5MTZlYjQ0YzJhYWZkNjU2MjJkMzNlZDZlYSIsInVzZXJfaWQiOjJ9.G-fToxI4XPY7ZkdxYvWkrcIvX7zci6v__m6TwKQ-nvA	2024-01-02 22:42:46.995644-05	2024-01-03 22:42:46-05	2	9d7dd5916eb44c2aafd65622d33ed6ea
34	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcwNDM3ODM4OCwiaWF0IjoxNzA0MjkxOTg4LCJqdGkiOiJkYmQwY2UxY2QwZmI0YzIzYjBlNGMxNDViMzNiMDdiMCIsInVzZXJfaWQiOjJ9.yIZiWtH655bTMUPXCnN-ZZwoAaXqMc28zapWIyERhAI	2024-01-03 09:26:28.679759-05	2024-01-04 09:26:28-05	2	dbd0ce1cd0fb4c23b0e4c145b33b07b0
35	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcwNDU2MzUwMSwiaWF0IjoxNzA0NDc3MTAxLCJqdGkiOiI2ZTM2M2Y5YWRmMTM0ZDBhOTc4NjQ2ODgzM2RhYzA3OSIsInVzZXJfaWQiOjJ9.NEDH6_0a7-G2L_X68w6BpPCSwpCvj3X9PYfePh6D9MU	2024-01-05 12:51:41.568334-05	2024-01-06 12:51:41-05	2	6e363f9adf134d0a9786468833dac079
36	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcwNDU2MzgyOSwiaWF0IjoxNzA0NDc3NDI5LCJqdGkiOiI4ZGYyNTU1M2YyMDc0ZDI5OTI5NDVkYmVmMTQ1NGU5MiIsInVzZXJfaWQiOjJ9.3skddarzXGLu7rTTpouaot1Y2jpV1qtMN3bDMYFGGOI	2024-01-05 12:57:09.276308-05	2024-01-06 12:57:09-05	2	8df25553f2074d2992945dbef1454e92
37	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcwNDU2NDE0NCwiaWF0IjoxNzA0NDc3NzQ0LCJqdGkiOiI4MGQzN2UyYzRlNzE0MDU2OTJkOWJlNzVmNzcyMDY5YyIsInVzZXJfaWQiOjJ9.JU8lf6cDOhJlWSGZouiPYWPZNdM2jpD9CQAbZFjQFIU	2024-01-05 13:02:24.852575-05	2024-01-06 13:02:24-05	2	80d37e2c4e71405692d9be75f772069c
38	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcwNDU2NDQ2MSwiaWF0IjoxNzA0NDc4MDYxLCJqdGkiOiIzMjI4Y2Q4OWIyZjE0ZWUyOWU5ZTQyZDQ2YjdlNWEwMSIsInVzZXJfaWQiOjJ9.iSf3ae6qODFTFllxxs_eGPgfQ6Gc9uYRVrYMPMAaavI	2024-01-05 13:07:41.452957-05	2024-01-06 13:07:41-05	2	3228cd89b2f14ee29e9e42d46b7e5a01
39	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcwNDU2NzMzMSwiaWF0IjoxNzA0NDgwOTMxLCJqdGkiOiI5ZTc3YWMxZjNhYzY0NTliYjBjOTBjODY2YzE4YWE2NCIsInVzZXJfaWQiOjJ9.efCVvenhlrQmKFV_vwqQD6J3tVoQB1WB1-f2t_sarJ8	2024-01-05 13:55:31.825701-05	2024-01-06 13:55:31-05	2	9e77ac1f3ac6459bb0c90c866c18aa64
40	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcwNDU2NzY2MiwiaWF0IjoxNzA0NDgxMjYyLCJqdGkiOiIzNDRjNDI0ZWNhOGI0MGY4ODFjYTY3Njc2NjZhYTg4NyIsInVzZXJfaWQiOjJ9.thwnvEva_w-Y_2UZQTQsCpCQ9VqOLc0A2qnYi1F_S6Y	2024-01-05 14:01:02.749904-05	2024-01-06 14:01:02-05	2	344c424eca8b40f881ca6767666aa887
41	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcwNDU2ODE0MSwiaWF0IjoxNzA0NDgxNzQxLCJqdGkiOiJiZTIwZDVlMmJmMzE0MzI2YTcxODgzN2E4YmRkNjNiMyIsInVzZXJfaWQiOjJ9.M_m3XPnjckHZ_QKKM5Z2VWKpB8A1dbv5zRSJoVqCCyc	2024-01-05 14:09:01.079076-05	2024-01-06 14:09:01-05	2	be20d5e2bf314326a718837a8bdd63b3
42	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcwNDU2OTQ3NSwiaWF0IjoxNzA0NDgzMDc1LCJqdGkiOiI0ZTIwZDExNTVjZjE0YzJmODlhMjU5NmJiOGQ5NTE1NCIsInVzZXJfaWQiOjJ9.Hy_FPXIAXmQBIT76ON9HUUuNexVvgzG1ae33HlH6gIM	2024-01-05 14:31:15.358245-05	2024-01-06 14:31:15-05	2	4e20d1155cf14c2f89a2596bb8d95154
43	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcwNDU2OTY3OCwiaWF0IjoxNzA0NDgzMjc4LCJqdGkiOiI0ZDEyMTYyMmQxMjM0YmEwOWFlMDA3ODY3ZDJkMTE0ZSIsInVzZXJfaWQiOjF9.iD5gd4E4JmyjkgscDfVh5YPfUf7v4ReEA6BEO4zpNOQ	2024-01-05 14:34:38.313212-05	2024-01-06 14:34:38-05	1	4d121622d1234ba09ae007867d2d114e
44	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcwNDU2OTkxNywiaWF0IjoxNzA0NDgzNTE3LCJqdGkiOiJiNjkzNGI0MWUxMGE0ZjkwYWM0YTEzMzRmYjY5M2VmMiIsInVzZXJfaWQiOjJ9.2zQ-LpzLqRe7V0kQchbZOwt-u6yQAM2-7W3ZLooYCdQ	2024-01-05 14:38:37.894513-05	2024-01-06 14:38:37-05	2	b6934b41e10a4f90ac4a1334fb693ef2
45	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcwNDU3MDI1NywiaWF0IjoxNzA0NDgzODU3LCJqdGkiOiJiMjY0N2FhNDRjNTQ0MGJlYmYwNGY3MDNkNzg3Y2IwMyIsInVzZXJfaWQiOjJ9.RZ6O96fxxOZ15QLMCQkP3nA_gLxQC9I6kE34g2Q5Eyk	2024-01-05 14:44:17.73295-05	2024-01-06 14:44:17-05	2	b2647aa44c5440bebf04f703d787cb03
46	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcwNDU3MDU3MSwiaWF0IjoxNzA0NDg0MTcxLCJqdGkiOiI1NDAxOTMzMDFjMzk0NDU5ODI2MmRkZmJjMThlMWJjYiIsInVzZXJfaWQiOjJ9.2GWRL0pslacuj3shwIJ5ZZVf84FESNPNDB33IQBybVg	2024-01-05 14:49:31.263819-05	2024-01-06 14:49:31-05	2	540193301c3944598262ddfbc18e1bcb
47	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcwNDU3MDU5MiwiaWF0IjoxNzA0NDg0MTkyLCJqdGkiOiIyZGRiOGQwMjAyYmQ0Nzk5OGZjOGM2MzZkMjQ3NzI4ZiIsInVzZXJfaWQiOjF9.UAC76cvFLlg4LSoB3_BwTjmWXa3Cujf19XyT2ugxawA	2024-01-05 14:49:52.021941-05	2024-01-06 14:49:52-05	1	2ddb8d0202bd47998fc8c636d247728f
48	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcwNDU3MDc5NSwiaWF0IjoxNzA0NDg0Mzk1LCJqdGkiOiJhMTA4YWE1OTE5Njg0OTBiOTdhMjEzZDEwMDM2OGFhNCIsInVzZXJfaWQiOjJ9.b_5jNA_L1RWvvo0uLfnt6UnLooe8TOpL_JaYfbQ0Zo4	2024-01-05 14:53:15.347465-05	2024-01-06 14:53:15-05	2	a108aa591968490b97a213d100368aa4
49	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcwNDU3MTAwOCwiaWF0IjoxNzA0NDg0NjA4LCJqdGkiOiJlODM1NzdhMmQxOTU0MGI1YTJhMTE2YzJmYWE2YTgxZiIsInVzZXJfaWQiOjN9.qNSlzx28r8W9y5ARHQPrhUlNofcbRAKB8s0G8Jm3L5E	2024-01-05 14:56:48.649486-05	2024-01-06 14:56:48-05	3	e83577a2d19540b5a2a116c2faa6a81f
50	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcwNDU3MTAzMywiaWF0IjoxNzA0NDg0NjMzLCJqdGkiOiI0OTdiZjJmMWMyZjY0Y2IzYjMyZDNiMjY2ZTk3ZjU0YyIsInVzZXJfaWQiOjJ9.GKqh1ZRSdxr6tt-MDciSMlRRcz-ACWaryCO19u2I290	2024-01-05 14:57:13.262733-05	2024-01-06 14:57:13-05	2	497bf2f1c2f64cb3b32d3b266e97f54c
51	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcwNDU3MTIzOSwiaWF0IjoxNzA0NDg0ODM5LCJqdGkiOiIxMzI0YTVlOTM1MmQ0ZjZkYjgwNzI4NDE1Y2FjOGVlNSIsInVzZXJfaWQiOjJ9.JiE8lyYMsXGQnz8u7GNenF5Z7eV-zFV8jnFIcmK8r24	2024-01-05 15:00:39.962832-05	2024-01-06 15:00:39-05	2	1324a5e9352d4f6db80728415cac8ee5
52	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcwNDU5ODI4NiwiaWF0IjoxNzA0NTExODg2LCJqdGkiOiJmNWRjMjgxYWRhOTE0MzNiYTBjY2EwN2ZmNWI0ODBjOSIsInVzZXJfaWQiOjJ9.1blTdeHigMeE317ZRdfmwRfLnxEwzba88TXgCVv8XkA	2024-01-05 22:31:26.386921-05	2024-01-06 22:31:26-05	2	f5dc281ada91433ba0cca07ff5b480c9
53	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcwNDc4MDI3NSwiaWF0IjoxNzA0NjkzODc1LCJqdGkiOiI1OTgxNmIzZDYyN2Y0OWI5ODJiOTU5ZGZhYjkyYzU4NCIsInVzZXJfaWQiOjF9.dqJLg7POT0wiX5ZaGVXz7xdhQTAmyz0JTm5o4_mdRTY	2024-01-08 01:04:35.331619-05	2024-01-09 01:04:35-05	1	59816b3d627f49b982b959dfab92c584
54	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcwNDc4MDMwMCwiaWF0IjoxNzA0NjkzOTAwLCJqdGkiOiJkNjUyYjg4OWZhNTY0YTE2YjBhMjA5NGM0NGI5ZDcyOCIsInVzZXJfaWQiOjN9.fzPzz_rSizEZuyw9uKSc1tRHNuldNTPFclps998AmBQ	2024-01-08 01:05:00.419956-05	2024-01-09 01:05:00-05	3	d652b889fa564a16b0a2094c44b9d728
55	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcwNDc4NTMzNywiaWF0IjoxNzA0Njk4OTM3LCJqdGkiOiI2YTU0NzdiN2VmNDM0ZjI3YjNjODE0NjhjYjRlOWIzYyIsInVzZXJfaWQiOjN9.zQ-JesrG5XLmqEwJg5OI2ewi0dY9W-5E0djF1O6GspU	2024-01-08 02:28:57.886581-05	2024-01-09 02:28:57-05	3	6a5477b7ef434f27b3c81468cb4e9b3c
56	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcwNDc4NTk4OCwiaWF0IjoxNzA0Njk5NTg4LCJqdGkiOiI2NDM0NjFmYmQ2ZTk0OTJmODY0MWY5NjVhNGVkMzA5NiIsInVzZXJfaWQiOjN9.Z9hpPhIER7IKpCy-PwLMzkze7UsmFvfhYm6mpyCgXo8	2024-01-08 02:39:48.667729-05	2024-01-09 02:39:48-05	3	643461fbd6e9492f8641f965a4ed3096
57	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcwNDc4OTEyNywiaWF0IjoxNzA0NzAyNzI3LCJqdGkiOiJkMGExOTZhYzY2MDQ0NjIwOTQxOGMxMTM5NTNmZTE3MCIsInVzZXJfaWQiOjN9.Fq3NcSqgTeNaURBFAgHD_EYTZFbZfXfPbJysOCzDWmo	2024-01-08 03:32:07.398892-05	2024-01-09 03:32:07-05	3	d0a196ac660446209418c113953fe170
58	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcwNDc5MjgyOSwiaWF0IjoxNzA0NzA2NDI5LCJqdGkiOiJlMjAyYTM3NmU4MTk0OTViYjQ3YTAyNjkyMWYyODRmZCIsInVzZXJfaWQiOjN9.SJav82RZIIwMyRGkpRa11WcalleJOVjVfj7NLjekVc4	2024-01-08 04:33:49.704569-05	2024-01-09 04:33:49-05	3	e202a376e819495bb47a026921f284fd
59	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcwNDc5MzI2NywiaWF0IjoxNzA0NzA2ODY3LCJqdGkiOiIwYWM5MjQyMjcyMDA0ZDExODBiOTk1MjQ5ZTA4Yzc0OCIsInVzZXJfaWQiOjN9.h8y-dj28zVAL8hMnh0qlFm3F9M02K39BYCNqlr0OFvk	2024-01-08 04:41:07.972165-05	2024-01-09 04:41:07-05	3	0ac9242272004d1180b995249e08c748
60	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcwNDc5MzQyNiwiaWF0IjoxNzA0NzA3MDI2LCJqdGkiOiI3OWIwOWU5MzA1OGM0YjAwYjhhNmNjMTQ2NTM1OWQwZCIsInVzZXJfaWQiOjJ9.lvVgruntz0y3uRV4I5i9RptnU2hWHGcSt5ZtgU1v6fA	2024-01-08 04:43:46.983734-05	2024-01-09 04:43:46-05	2	79b09e93058c4b00b8a6cc1465359d0d
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
101	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcwNjE2NzMwNSwiaWF0IjoxNzA2MTUyOTA1LCJqdGkiOiIyNTZjYzgzNmIxOGM0M2E5OGM0MDhhZmFkOWU2ZWVkYyIsInVzZXJfaWQiOjJ9.g7IKMm-Tl05j_jxih2BIXque8nuGBIT2ynjki9GVIdA	2024-01-24 22:21:45.336569-05	2024-01-25 02:21:45-05	2	256cc836b18c43a98c408afad9e6eedc
102	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcwNjE3MDc3NCwiaWF0IjoxNzA2MTU2Mzc0LCJqdGkiOiI4MzI4ZGJhYjA5ZGQ0NzA1YjlmODczOWZiYzYyMGEzYSIsInVzZXJfaWQiOjF9.XnRHYBzq2g5LlacMcZZNZDHh2-Kw8tmqCwRNUDsqPC8	2024-01-24 23:19:34.030639-05	2024-01-25 03:19:34-05	1	8328dbab09dd4705b9f8739fbc620a3a
103	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcwNjIyMzMyMiwiaWF0IjoxNzA2MjA4OTIyLCJqdGkiOiJjMjllZmVhMTIxMTY0MDcxODg5NjUzZTEwY2JkOWM4ZiIsInVzZXJfaWQiOjJ9.YGTskh8EZz3_DylaL2SddGaHvKdpG5ix9OVNLRFDnQM	2024-01-25 13:55:22.29506-05	2024-01-25 17:55:22-05	2	c29efea121164071889653e10cbd9c8f
104	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcwNjMwOTYyMiwiaWF0IjoxNzA2Mjk1MjIyLCJqdGkiOiJlYTA2NDhlYzQ4ZDY0MjMwYmJiNGEwZjZjOWRiYmQ2MCIsInVzZXJfaWQiOjJ9.y1tr6J6vlCeAEQ4uqb-Oh725j4Y4VY1BOUlK5L84EXM	2024-01-26 13:53:42.109068-05	2024-01-26 17:53:42-05	2	ea0648ec48d64230bbb4a0f6c9dbbd60
105	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcwNjMyNzMzNCwiaWF0IjoxNzA2MzEyOTM0LCJqdGkiOiIyY2RmOTFlYzYyZDk0Mjk2OThhNWViMWY1YzFkZGYyMyIsInVzZXJfaWQiOjJ9.fisU6yv5Jzia-3s5_sIJ39JVa8Nju0VpVWFEZrfhR-U	2024-01-26 18:48:54.739983-05	2024-01-26 22:48:54-05	2	2cdf91ec62d9429698a5eb1f5c1ddf23
106	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcwNjQxMDEwNywiaWF0IjoxNzA2Mzk1NzA3LCJqdGkiOiJmYjEzNWYyOGVmODk0MThjOWFkMTdkYjNkYjg5YzAyNCIsInVzZXJfaWQiOjJ9.Qhx3PlfEepO-_4Nnbu_RuCVkA0LwcTTJjM1SriV5rUM	2024-01-27 17:48:27.755864-05	2024-01-27 21:48:27-05	2	fb135f28ef89418c9ad17db3db89c024
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

COPY public.ventas_lead (id, nombre, apellido, asignado, celular, celular2, comentario, "horaRecepcion", llamar, "recienCreado", fecha_creacion, fecha_actualizacion, asesor_id, campania_id, estado_id, "estadoLead_id", objecion_id, "usuarioActualizador_id", "usuarioCreador_id") FROM stdin;
5	aaaa	aaaaaaa	f	999875468		Pidio un asesor personal	2023-10-04 00:00:00-05	t	t	2024-01-10	\N	\N	1	A	EP	1	1	1
7			f	934789123			2023-12-29 18:34:47.930827-05	t	t	2024-01-10	\N	\N	3	A	EP	1	1	1
10			f	934789123			2023-12-29 18:35:30-05	t	t	2024-01-25	2024-01-25 15:28:16.36108-05	\N	3	A	EP	1	1	1
4			t	934789123			2023-12-29 18:33:45.920404-05	t	t	2024-01-27	2024-01-27 18:00:04.028532-05	1	3	A	EP	1	1	1
6	Jesus		t	958742315			2023-12-29 18:34:47.913955-05	t	t	2024-01-27	2024-01-27 18:00:04.033712-05	2	2	A	EP	1	1	1
9	Jesus		t	958742315			2023-12-29 18:35:30-05	t	t	2024-01-27	2024-01-27 18:00:04.043648-05	1	2	A	EP	1	1	1
8	Juan	Reynoso	t	987564231		Pidio un asesor personal	2023-10-04 00:00:00-05	t	t	2024-01-27	2024-01-27 18:00:04.048662-05	2	1	A	EP	1	1	1
2	aaaa	aaaaaaa	t	999875468		Pidio un asesor personal	2023-10-04 00:00:00-05	t	t	2024-01-27	2024-01-27 18:00:04.06136-05	1	1	A	EP	1	1	1
3	Jesus		t	958742315			2023-12-29 18:33:45-05	t	t	2024-01-27	2024-01-27 18:00:04.069779-05	2	2	A	EP	1	1	1
1	BRIAN	VELASCO	t	935488033			2023-12-29 15:54:52-05	t	t	2024-01-27	2024-01-27 18:03:50.626188-05	1	1	A	NR	1	1	4
\.


--
-- Data for Name: ventas_desasignacionleadasesor; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.ventas_desasignacionleadasesor (id, fecha, lead_id, usuario_id) FROM stdin;
1	2024-01-24	1	2
2	2024-01-25	1	3
3	2024-01-25	9	4
4	2024-01-25	10	8
\.


--
-- Data for Name: ventas_estadoevento; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.ventas_estadoevento (nombre, descripcion, estado_id) FROM stdin;
En curso	En curso	A
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

COPY public.ventas_evento (id, titulo, duracion, fecha_visita, observacion, fecha_creacion, fecha_actualizacion, asesor_id, estado_id, lead_id, tipo_id, "usuarioActualizador_id", "usuarioCreador_id", "estadoEvento_id", separado) FROM stdin;
1	Firma del contrato de socabaya	50	2023-12-30 22:12:30-05		2024-01-24	2023-12-29 22:13:24-05	2	A	1	1	2	1	En curso	f
\.


--
-- Data for Name: ventas_historicoleadasesor; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.ventas_historicoleadasesor (id, fecha_creacion, lead_id, usuario_id) FROM stdin;
1	2024-01-25	1	5
2	2024-01-25	2	5
3	2024-01-25	3	5
4	2024-01-25	1	4
5	2024-01-25	2	4
6	2024-01-25	3	4
7	2024-01-25	1	1
8	2024-01-25	2	1
9	2024-01-25	3	1
10	2024-01-27	9	1
11	2024-01-27	6	2
12	2024-01-27	4	1
13	2024-01-27	6	2
14	2024-01-27	9	1
15	2024-01-27	8	2
16	2024-01-27	2	1
17	2024-01-27	3	2
18	2024-01-27	9	1
19	2024-01-27	6	2
20	2024-01-27	4	1
21	2024-01-27	6	2
22	2024-01-27	9	1
23	2024-01-27	8	2
24	2024-01-27	2	1
25	2024-01-27	3	2
26	2024-01-27	9	1
27	2024-01-27	6	2
28	2024-01-27	4	1
29	2024-01-27	6	2
30	2024-01-27	9	1
31	2024-01-27	8	2
32	2024-01-27	2	1
33	2024-01-27	3	2
34	2024-01-27	9	1
35	2024-01-27	6	2
36	2024-01-27	4	1
37	2024-01-27	6	2
38	2024-01-27	9	1
39	2024-01-27	8	2
40	2024-01-27	2	1
41	2024-01-27	3	2
42	2024-01-27	1	1
\.


--
-- Data for Name: ventas_llamada; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.ventas_llamada (id, detalle, contesto, fecha_creacion, fecha_actualizacion, estado_id, lead_id, objecion_id, "usuarioActualizador_id", "usuarioCreador_id") FROM stdin;
1	Mucho texto	t	2024-01-24	2024-01-24 21:39:22-05	A	1	10	4	4
2	Mas texto	f	2024-01-24	2024-01-24 21:39:45-05	A	1	10	4	4
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

COPY public.ventas_whatsapp (id, detalle, respondio, fecha_creacion, fecha_actualizacion, estado_id, lead_id, objecion_id, "usuarioActualizador_id", "usuarioCreador_id") FROM stdin;
1	Demastiado texto	f	2024-01-24	2024-01-24 21:40:14-05	A	1	6	4	4
2	Mas texto	t	2024-01-24	2024-01-24 21:40:35-05	A	1	4	4	3
\.


--
-- Name: auth_group_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.auth_group_id_seq', 1, true);


--
-- Name: auth_group_permissions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.auth_group_permissions_id_seq', 63, true);


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

SELECT pg_catalog.setval('public.cuenta_user_groups_id_seq', 37, true);


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

SELECT pg_catalog.setval('public.django_admin_log_id_seq', 134, true);


--
-- Name: django_content_type_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.django_content_type_id_seq', 40, true);


--
-- Name: django_migrations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.django_migrations_id_seq', 55, true);


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

SELECT pg_catalog.setval('public.token_blacklist_outstandingtoken_id_seq', 106, true);


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
-- Name: ventas_evento_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.ventas_evento_id_seq', 1, true);


--
-- Name: ventas_historicoleadasesor_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.ventas_historicoleadasesor_id_seq', 42, true);


--
-- Name: ventas_lead_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.ventas_lead_id_seq', 10, true);


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

SELECT pg_catalog.setval('public.ventas_tipoevento_id_seq', 2, true);


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

