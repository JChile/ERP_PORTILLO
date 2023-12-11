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
1	Jefe de Marketing
2	Asistente de marketing
4	Jefe de Ventas
3	Jefe de Recursos Humanos
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
21	ventas	evento
22	ventas	tipoevento
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
81	Can add evento	21	add_evento
82	Can change evento	21	change_evento
83	Can delete evento	21	delete_evento
84	Can view evento	21	view_evento
85	Can add tipo evento	22	add_tipoevento
86	Can change tipo evento	22	change_tipoevento
87	Can delete tipo evento	22	delete_tipoevento
88	Can view tipo evento	22	view_tipoevento
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
35	3	45
36	3	46
37	3	47
38	3	48
39	3	49
40	3	50
41	3	51
42	3	52
43	3	57
44	3	58
45	3	59
46	3	60
47	4	49
48	4	50
49	4	51
50	4	52
51	4	57
52	4	58
53	4	59
54	4	60
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

COPY public.cuenta_modulo (id, nombre, "contentType_id", estado_id, url) FROM stdin;
7	Gestión de leads	15	A	lead
6	Gestion de eventos	21	A	evento
5	Gestion de usuarios	9	A	usuario
4	Gestión de asesores	13	A	asesor
3	Gestion de roles	3	A	rol
2	Gestion de campañas	12	A	campania
\.


--
-- Data for Name: cuenta_profile; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.cuenta_profile (id, dni, fecha, nacionalidad, "estadoCivil", "correoElectronico", celular, "telefonoFijo", profesion, talla_polo, cuenta_ahorros, contacto_caso_accidentes, parentesco_contacto_caso_accidentes, grupo_sanguineo, alergias, fondo_pension, "primerTrabajo", hijos, conyuge, p_mp, fecha_inicio_contrato, fecha_fin_contrato, sueldo, horario, documentos, estado_registro_id) FROM stdin;
2	\N	\N												\N			\N			\N	\N	\N			A
1	\N	\N												\N			\N			\N	\N	\N		\N	A
7	\N	\N												\N			\N			\N	\N	\N			A
8	\N	\N												\N			\N			\N	\N	\N			A
9	\N	\N												\N			\N			\N	\N	\N			A
11	\N	\N												\N			\N			\N	\N	\N			A
12	\N	\N												\N			\N			\N	\N	\N			A
10	\N	\N												\N			\N			\N	\N	\N		\N	A
13	\N	\N	PE	s	\N	\N	\N	\N		\N	\N	\N	\N	\N	p	\N	\N	\N	\N	\N	\N	\N	\N		A
14	\N	\N	PE	s	\N	\N	\N	\N		\N	\N	\N	\N	\N	p	\N	\N	\N	\N	\N	\N	\N	\N		A
\.


--
-- Data for Name: cuenta_user; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.cuenta_user (id, password, last_login, is_superuser, username, first_name, last_name, email, is_staff, is_active, date_joined, perfil_id) FROM stdin;
11	pbkdf2_sha256$600000$X3VayFtrFszOtSzB4B23uz$kMDVQ0eSXbIJEJZR3ZIQFPIrF61cbeg+lhSKtPbtNK8=	\N	f	marketing2				t	t	2023-09-28 22:35:51.638449-05	11
12	pbkdf2_sha256$600000$RSPz8suMDwj0BaaYplKhGJ$HGwhb/1m7ewyonQA7SWDIkJ1OptF5WUbHDTTy1m82hM=	\N	f	marketing3				t	t	2023-09-28 22:36:04.20812-05	12
7	pbkdf2_sha256$600000$UDrk5T3tz7yMPksBVnOFCx$GG4iq1fGvFp80vShtHWzYOAc/+p0vWlvp4iAgx8XfIk=	\N	f	Asesor1				t	t	2023-09-28 22:34:37-05	7
8	pbkdf2_sha256$600000$HsT8Axx7MTH5xF3epsqWEW$0FPSIgRADzbeAz7kFNpwi2ZZ/zGm0+X9uXbj9L+MM2o=	\N	f	Asesor2				t	t	2023-09-28 22:34:52-05	8
9	pbkdf2_sha256$600000$LuqWcX9UZes3p6mij1erYD$zc7Qe29RaoxltH5zX6WINR4QSp5JiVD9SJsydMsQmQM=	\N	f	Asesor3				t	t	2023-09-28 22:35:11-05	9
2	pbkdf2_sha256$600000$tNoWOXjTwQYnhtklT6Kp1X$GxR65ifvHynoX5dl6Nv/6m0fsRkiLOlaHwniLuiVloU=	2023-10-05 11:29:45.841674-05	t	qwerty				t	t	2023-09-27 22:08:50-05	2
10	pbkdf2_sha256$600000$dOkbJU2oh89g9NsyWhd90R$zE8TL27A7VEnOTAoht7AfKZC3SyKV2I1UTwwDJtVqSc=	\N	f	marketing1	Carlos Abel	Chuctaya Ruiz	carlitosabel@portillo.com	t	t	2023-09-28 22:35:40.775624-05	10
13	pbkdf2_sha256$600000$u2J0bMxpdd5pANVeZQtlG3$zpOuVhb35Lfzue5zOlFZUnNUZm1m4+pOZF16vEzPu8o=	\N	f	arihuascar	Robert	Arihuascar	ajacoboc@unsa.edu.pe	f	t	2023-12-10 22:26:38.822584-05	13
14	pbkdf2_sha256$600000$bxcCeVLtcVCNgED3XE7yRJ$bQc5XYU+ZRd50jt3q6Ff3631rHQ19wYGT2zOsvCAcXU=	\N	f	asesorcocoliso	Pedro	De La Cadena	asesor@gmail.com	f	t	2023-12-10 22:28:54.89388-05	14
1	pbkdf2_sha256$600000$XeMWVNeYvgoN3QLYxfsCkW$gJyjaRFRAGC8je7My6z54vkKE5OOmL4G8xDcaKRpCNo=	2023-12-10 22:34:41.072642-05	t	andrew	Andrew	Pold		t	t	2023-09-27 22:08:24.125613-05	1
\.


--
-- Data for Name: cuenta_user_groups; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.cuenta_user_groups (id, user_id, group_id) FROM stdin;
2	1	3
12	11	2
13	12	2
14	7	4
15	8	4
16	9	4
17	2	3
18	10	2
19	13	3
20	14	4
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
1	2023-09-27 23:03:43.456975-05	10	Playa/Campo / Casa	2	[{"changed": {"fields": ["Nombre"]}}]	17	2
2	2023-09-28 22:21:14.881683-05	1	Socabaya	1	[{"added": {}}]	10	2
3	2023-09-28 22:21:32.06774-05	2	Alamos	1	[{"added": {}}]	10	2
4	2023-09-28 22:21:57.280844-05	3	Yanahuara	1	[{"added": {}}]	10	2
5	2023-09-28 22:22:09.462235-05	1	Facebook	1	[{"added": {}}]	11	2
6	2023-09-28 22:22:18.332738-05	2	WhatsApp	1	[{"added": {}}]	11	2
7	2023-09-28 22:22:28.08144-05	3	Bola	1	[{"added": {}}]	11	2
8	2023-09-28 22:22:32.589562-05	4	Cartel	1	[{"added": {}}]	11	2
9	2023-09-28 22:22:39.355044-05	3	Bolante	2	[{"changed": {"fields": ["Nombre"]}}]	11	2
10	2023-09-28 22:23:11.670865-05	1	Navidad	1	[{"added": {}}]	12	2
11	2023-09-28 22:23:31.351836-05	2	Verano	1	[{"added": {}}]	12	2
12	2023-09-28 22:23:46.636484-05	3	Otoño	1	[{"added": {}}]	12	2
13	2023-09-28 22:24:07.853449-05	4	Primavera	1	[{"added": {}}]	12	2
14	2023-09-28 22:28:16.446837-05	4	bbb	2	[{"changed": {"fields": ["Password"]}}]	9	2
15	2023-09-28 22:33:06.821479-05	6	Profile object (6)	3		7	2
16	2023-09-28 22:33:06.826818-05	5	Profile object (5)	3		7	2
17	2023-09-28 22:33:06.828234-05	4	Profile object (4)	3		7	2
18	2023-09-28 22:33:06.829629-05	3	Profile object (3)	3		7	2
19	2023-09-28 22:36:32.751264-05	7	Asesor1	2	[{"changed": {"fields": ["Groups"]}}]	9	2
20	2023-09-28 22:36:40.724619-05	8	Asesor2	2	[{"changed": {"fields": ["Groups"]}}]	9	2
21	2023-09-28 22:36:45.959576-05	9	Asesor3	2	[{"changed": {"fields": ["Groups"]}}]	9	2
22	2023-09-29 20:00:02.425772-05	2	qwerty	2	[{"changed": {"fields": ["Groups"]}}]	9	2
23	2023-10-11 13:38:04.339821-05	6	Escolar	3		12	1
24	2023-10-11 13:38:04.345003-05	5	Invierno	3		12	1
25	2023-10-11 13:38:04.346011-05	4	Primavera	3		12	1
26	2023-10-11 13:38:04.347011-05	3	Otoño	3		12	1
27	2023-10-11 13:38:04.348011-05	2	Verano	3		12	1
28	2023-10-11 13:38:04.349018-05	1	Navidad	3		12	1
29	2023-10-11 13:40:36.424406-05	3	asesor c	3		13	1
30	2023-10-11 13:40:36.430079-05	2	asesor b	3		13	1
31	2023-10-11 13:40:36.431159-05	1	asesor a	3		13	1
32	2023-10-22 12:02:44.285354-05	6	Andrew	2	[{"changed": {"fields": ["HoraRecepcion"]}}]	15	1
33	2023-10-22 12:22:53.382544-05	11	Julian	3		15	1
34	2023-10-22 12:22:53.387397-05	10	Oliver	3		15	1
35	2023-10-22 12:22:53.38894-05	9	Juan	3		15	1
36	2023-10-22 12:33:14.146799-05	8	Dieguillo	3		15	1
37	2023-10-22 12:33:14.152799-05	7	Jesus	3		15	1
38	2023-10-22 12:33:14.153799-05	6	Andrew	3		15	1
39	2023-10-22 12:33:14.15533-05	5		3		15	1
40	2023-10-22 12:33:14.157364-05	4		3		15	1
41	2023-10-22 12:33:14.158373-05	3	Jaimito	3		15	1
42	2023-10-22 12:33:14.160365-05	2	BRIAN	3		15	1
43	2023-10-22 12:39:15.053774-05	16		3		15	1
44	2023-10-22 12:39:15.05827-05	15		3		15	1
45	2023-10-22 12:39:15.059958-05	14		3		15	1
46	2023-10-22 12:39:15.060464-05	13	Jesus	3		15	1
47	2023-10-22 12:39:15.061477-05	12	Andrew	3		15	1
48	2023-10-22 12:49:49.114813-05	21		3		15	1
49	2023-10-22 12:49:49.119147-05	20		3		15	1
50	2023-10-22 12:49:49.120718-05	19		3		15	1
51	2023-10-22 12:49:49.121326-05	18	Jesus	3		15	1
52	2023-10-22 12:49:49.12329-05	17	Andrew	3		15	1
53	2023-10-22 12:52:25.056428-05	26		3		15	1
54	2023-10-22 12:52:25.061431-05	25		3		15	1
55	2023-10-22 12:52:25.062961-05	24		3		15	1
56	2023-10-22 12:52:25.063976-05	23	Jesus	3		15	1
57	2023-10-22 12:52:25.064972-05	22	Andrew	3		15	1
58	2023-10-22 12:55:18.217172-05	31		3		15	1
59	2023-10-22 12:55:18.223917-05	30		3		15	1
60	2023-10-22 12:55:18.224918-05	29		3		15	1
61	2023-10-22 12:55:18.225908-05	28	Jesus	3		15	1
62	2023-10-22 12:55:18.226999-05	27	Andrew	3		15	1
63	2023-10-22 12:57:00.561244-05	36		3		15	1
64	2023-10-22 12:57:00.565197-05	35		3		15	1
65	2023-10-22 12:57:00.566245-05	34		3		15	1
66	2023-10-22 12:57:00.567243-05	33	Jesus	3		15	1
67	2023-10-22 12:57:00.569252-05	32	Andrew	3		15	1
68	2023-10-22 12:58:16.046502-05	41		3		15	1
69	2023-10-22 12:58:16.052578-05	40		3		15	1
70	2023-10-22 12:58:16.053577-05	39		3		15	1
71	2023-10-22 12:58:16.055588-05	38	Jesus	3		15	1
72	2023-10-22 12:58:16.055588-05	37	Andrew	3		15	1
73	2023-10-22 13:34:28.457703-05	48		3		15	1
74	2023-10-22 13:36:30.069402-05	49		3		15	1
75	2023-10-22 13:37:15.514712-05	50		3		15	1
76	2023-10-22 13:38:44.195929-05	51		3		15	1
77	2023-10-22 13:45:02.219609-05	54		3		15	1
78	2023-10-22 13:45:02.223563-05	53		3		15	1
79	2023-10-22 13:45:02.224615-05	52		3		15	1
80	2023-10-22 13:46:36.966026-05	55		3		15	1
81	2023-10-22 13:47:14.531493-05	56		3		15	1
82	2023-10-22 13:48:22.657794-05	47	Dieguillo	3		15	1
83	2023-10-22 13:48:22.664238-05	46		3		15	1
84	2023-10-22 13:48:22.666201-05	45		3		15	1
85	2023-10-22 13:48:22.667764-05	44		3		15	1
86	2023-10-22 13:48:22.669294-05	43	Jesus	3		15	1
87	2023-10-22 13:48:22.670918-05	42	Andrew	3		15	1
88	2023-10-22 20:22:39.279444-05	65	Julian	2	[{"changed": {"fields": ["Asignado", "Asesor"]}}]	15	1
89	2023-10-22 20:22:47.615114-05	64	Oliver	2	[{"changed": {"fields": ["Asignado", "Asesor"]}}]	15	1
90	2023-10-22 20:36:33.856793-05	4	ASESOR_A	2	[{"changed": {"fields": ["NumeroLeads"]}}]	13	1
91	2023-10-22 20:36:40.783091-05	5	ASESOR_B	2	[{"changed": {"fields": ["NumeroLeads"]}}]	13	1
92	2023-10-22 20:36:46.434047-05	6	ASESOR_C	2	[{"changed": {"fields": ["NumeroLeads"]}}]	13	1
93	2023-10-22 20:46:57.785192-05	57	Andrew	3		15	1
94	2023-12-10 23:01:11.217337-05	6	Gestion de eventos	1	[{"added": {}}]	8	1
95	2023-12-10 23:10:42.373713-05	7	Gestión de asesores lead	1	[{"added": {}}]	8	1
96	2023-12-10 23:16:01.540078-05	1	Gestion de leads	2	[{"changed": {"fields": ["Url"]}}]	8	1
97	2023-12-10 23:16:15.540934-05	2	Gestion de campañas	2	[{"changed": {"fields": ["Url"]}}]	8	1
98	2023-12-10 23:16:41.84008-05	3	Gestion de roles	2	[{"changed": {"fields": ["Url"]}}]	8	1
99	2023-12-10 23:16:46.254096-05	4	Gestión de asesores	2	[{"changed": {"fields": ["Url"]}}]	8	1
100	2023-12-10 23:16:50.946415-05	5	Gestion de usuarios	2	[{"changed": {"fields": ["Url"]}}]	8	1
101	2023-12-10 23:16:55.637348-05	6	Gestion de eventos	2	[{"changed": {"fields": ["Url"]}}]	8	1
102	2023-12-10 23:17:04.842496-05	7	Gestión de asesores lead	2	[{"changed": {"fields": ["Url"]}}]	8	1
103	2023-12-10 23:17:32.090879-05	2	Gestion de campañas	2	[]	8	1
104	2023-12-10 23:17:41.617737-05	1	Gestion de marketing leads	2	[{"changed": {"fields": ["Nombre"]}}]	8	1
105	2023-12-10 23:17:49.48224-05	7	Gestión de asesor lead	2	[{"changed": {"fields": ["Nombre"]}}]	8	1
106	2023-12-10 23:18:02.52853-05	1	Gestion de marketing lead	2	[{"changed": {"fields": ["Nombre"]}}]	8	1
107	2023-12-10 23:18:05.798967-05	1	Gestion de marketing lead	2	[]	8	1
108	2023-12-10 23:18:09.434384-05	7	Gestión de asesor lead	2	[]	8	1
109	2023-12-10 23:20:21.718156-05	2	Gestion de campañas	2	[{"changed": {"fields": ["Url"]}}]	8	1
110	2023-12-10 23:29:49.194224-05	7	Gestión de leads	2	[{"changed": {"fields": ["Nombre"]}}]	8	1
111	2023-12-10 23:29:55.982526-05	1	Gestion de marketing lead	3		8	1
112	2023-12-10 23:34:11.696824-05	7	Gestión de leads	2	[{"changed": {"fields": ["Url"]}}]	8	1
113	2023-12-10 23:34:18.098547-05	6	Gestion de eventos	2	[]	8	1
114	2023-12-10 23:34:20.745059-05	5	Gestion de usuarios	2	[]	8	1
115	2023-12-10 23:34:23.507148-05	4	Gestión de asesores	2	[]	8	1
116	2023-12-10 23:34:25.533787-05	3	Gestion de roles	2	[]	8	1
117	2023-12-10 23:34:27.706564-05	2	Gestion de campañas	2	[]	8	1
\.


--
-- Data for Name: django_migrations; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.django_migrations (id, app, name, applied) FROM stdin;
1	contenttypes	0001_initial	2023-10-11 13:34:00.799355-05
2	contenttypes	0002_remove_content_type_name	2023-10-11 13:34:00.817757-05
3	auth	0001_initial	2023-10-11 13:34:00.882135-05
4	auth	0002_alter_permission_name_max_length	2023-10-11 13:34:00.891358-05
5	auth	0003_alter_user_email_max_length	2023-10-11 13:34:00.89868-05
6	auth	0004_alter_user_username_opts	2023-10-11 13:34:00.89868-05
7	auth	0005_alter_user_last_login_null	2023-10-11 13:34:00.91306-05
8	auth	0006_require_contenttypes_0002	2023-10-11 13:34:00.916998-05
9	auth	0007_alter_validators_add_error_messages	2023-10-11 13:34:00.916998-05
10	auth	0008_alter_user_username_max_length	2023-10-11 13:34:00.916998-05
11	auth	0009_alter_user_last_name_max_length	2023-10-11 13:34:00.932007-05
12	auth	0010_alter_group_name_max_length	2023-10-11 13:34:00.948833-05
13	auth	0011_update_proxy_permissions	2023-10-11 13:34:00.949349-05
14	auth	0012_alter_user_first_name_max_length	2023-10-11 13:34:00.949349-05
15	cuenta	0001_initial	2023-10-11 13:34:01.080641-05
16	admin	0001_initial	2023-10-11 13:34:01.103046-05
17	admin	0002_logentry_remove_auto_add	2023-10-11 13:34:01.117225-05
18	admin	0003_logentry_add_action_flag_choices	2023-10-11 13:34:01.122361-05
19	marketing	0001_initial	2023-10-11 13:34:01.200601-05
20	sessions	0001_initial	2023-10-11 13:34:01.224656-05
21	token_blacklist	0001_initial	2023-10-11 13:34:01.271069-05
22	token_blacklist	0002_outstandingtoken_jti_hex	2023-10-11 13:34:01.279661-05
23	token_blacklist	0003_auto_20171017_2007	2023-10-11 13:34:01.296113-05
24	token_blacklist	0004_auto_20171017_2013	2023-10-11 13:34:01.3127-05
25	token_blacklist	0005_remove_outstandingtoken_jti	2023-10-11 13:34:01.319838-05
26	token_blacklist	0006_auto_20171017_2113	2023-10-11 13:34:01.333705-05
27	token_blacklist	0007_auto_20171017_2214	2023-10-11 13:34:01.367837-05
28	token_blacklist	0008_migrate_to_bigautofield	2023-10-11 13:34:01.430239-05
29	token_blacklist	0010_fix_migrate_to_bigautofield	2023-10-11 13:34:01.44891-05
30	token_blacklist	0011_linearizes_history	2023-10-11 13:34:01.44891-05
31	token_blacklist	0012_alter_outstandingtoken_user	2023-10-11 13:34:01.472787-05
32	ventas	0001_initial	2023-10-11 13:34:01.688774-05
35	ventas	0002_alter_lead_llamar	2023-10-22 11:38:13.375514-05
36	ventas	0003_alter_lead_estadolead_alter_lead_objecion	2023-10-22 11:41:26.785094-05
37	ventas	0004_alter_lead_horarecepcion	2023-10-22 12:05:08.979259-05
38	ventas	0005_alter_lead_horarecepcion	2023-10-22 12:56:31.425706-05
39	ventas	0006_alter_lead_horarecepcion	2023-10-22 13:24:51.517049-05
40	ventas	0007_tipoevento_evento	2023-12-10 22:12:57.39895-05
41	cuenta	0002_alter_modulo_contenttype	2023-12-10 23:09:51.938644-05
42	cuenta	0003_modulo_url	2023-12-10 23:15:39.26857-05
\.


--
-- Data for Name: django_session; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.django_session (session_key, session_data, expire_date) FROM stdin;
iw3o7a3a20chnn5recx241af4slqmztb	.eJxVjDsOwjAQBe_iGlleY_yhpOcM1q53jQMokeKkQtwdIqWA9s3Me6mM69Ly2mXOA6uzsurwuxGWh4wb4DuOt0mXaVzmgfSm6J12fZ1Ynpfd_Tto2Nu3TtWSWHRQg6scT0dOMRAUiB4gUXVgYiFfgbmIFxfQSiWTPGAKJop6fwDv9zhA:1qliFL:OKbHP2VIWcMGCEe-UgR1YrI-HstinO_J_4DNuBkc-qY	2023-10-11 23:03:27.192767-05
37f4n6sphsec7oswti59elchrw7tgrf3	.eJxVjDsOwjAQBe_iGlleY_yhpOcM1q53jQMokeKkQtwdIqWA9s3Me6mM69Ly2mXOA6uzsurwuxGWh4wb4DuOt0mXaVzmgfSm6J12fZ1Ynpfd_Tto2Nu3TtWSWHRQg6scT0dOMRAUiB4gUXVgYiFfgbmIFxfQSiWTPGAKJop6fwDv9zhA:1qoREP:q_8oLr5QClD83MTPwh4kzLrqI6oSPrhSNc-IpYyNe7s	2023-10-19 11:29:45.844214-05
77kbso3539trzfzs20cekl6gk8rfj5ln	.eJxVjEEOwiAQRe_C2hAGylBcuvcMZGBAqoYmpV0Z765NutDtf-_9lwi0rTVsPS9hYnEWIE6_W6T0yG0HfKd2m2Wa27pMUe6KPGiX15nz83K4fweVev3WtmjwPg7gEKFol9ApcD6DSqgtGIDBJK-NKsQJWZtRIRW0cQTriJV4fwCjxzZ1:1qqe2U:LFY7opKKwPIW2KKcM4vD42p-zKfqlb2ZelnRxghwK64	2023-10-25 13:34:34.953156-05
lv0bpy4j8js3o674caxyk73f3omcnqdb	.eJxVjEEOwiAQRe_C2hAGylBcuvcMZGBAqoYmpV0Z765NutDtf-_9lwi0rTVsPS9hYnEWIE6_W6T0yG0HfKd2m2Wa27pMUe6KPGiX15nz83K4fweVev3WtmjwPg7gEKFol9ApcD6DSqgtGIDBJK-NKsQJWZtRIRW0cQTriJV4fwCjxzZ1:1quaKd:BJVN_hkWyJGl5nNEnhcE10-5rfvwMXBxI7DDYtL1u5I	2023-11-05 10:25:35.204856-05
jp124q4bmx473ieanv3hkvv2jd8ft7vj	.eJxVjEEOwiAQRe_C2hAGylBcuvcMZGBAqoYmpV0Z765NutDtf-_9lwi0rTVsPS9hYnEWIE6_W6T0yG0HfKd2m2Wa27pMUe6KPGiX15nz83K4fweVev3WtmjwPg7gEKFol9ApcD6DSqgtGIDBJK-NKsQJWZtRIRW0cQTriJV4fwCjxzZ1:1rCX45:1C1ul5x8RJSuXJntlHewGWaae9TbnWtbdLwL6dkVfMQ	2023-12-24 22:34:41.075707-05
\.


--
-- Data for Name: marketing_categoria; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.marketing_categoria (id, nombre, estado_id) FROM stdin;
1	Facebook	A
2	WhatsApp	A
4	Cartel	A
3	Bolante	A
\.


--
-- Data for Name: marketing_proyecto; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.marketing_proyecto (id, nombre, ubicacion, descripcion, estado_id) FROM stdin;
1	Socabaya	socabaya	descripcion.....	A
2	Alamos	Arequipa	blablabla	A
3	Yanahuara	Arequipa - Yanahuara	blablablaaaa	A
\.


--
-- Data for Name: marketing_campania; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.marketing_campania (id, nombre, codigo, fecha_creacion, fecha_estimada, fecha_cierre, coste_estimado, coste_real, descripcion, categoria_id, estado_id, proyecto_id) FROM stdin;
7	Campaña navideña - Alamos - Online- Facebook	campañanavideña-alamos-online-facebook_facebook_10_7	2023-10-11 13:39:07.030298-05	2023-10-11	2023-10-31	1200	1200		1	A	2
8	Campaña fisica - Alamos	campañafisica-alamos_bolante_10_8	2023-10-11 13:39:57.41461-05	2023-10-11	2023-10-24	300	300		3	A	2
\.


--
-- Data for Name: token_blacklist_outstandingtoken; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.token_blacklist_outstandingtoken (id, token, created_at, expires_at, user_id, jti) FROM stdin;
1	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTY5NzEzNTc0MSwiaWF0IjoxNjk3MDQ5MzQxLCJqdGkiOiJjZTY0NDY3YjIxNTg0YzdiODFjMmMwOWNiYzMxYWI2YyIsInVzZXJfaWQiOjF9.b5tS4grG2PR2Slt6H5DWV1HY0eWaDh5i8vjWCuX0NeA	2023-10-11 13:35:41.745409-05	2023-10-12 13:35:41-05	1	ce64467b21584c7b81c2c09cbc31ab6c
2	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTY5NzEzNTc3NywiaWF0IjoxNjk3MDQ5Mzc3LCJqdGkiOiIzODU5YjgzNmIzMWM0YjYxYjY5ZDM3ZGU3NDAwMTQ0MCIsInVzZXJfaWQiOjF9.pHbf1Z8xusuDl-8mjB981nnw__3TZ5ymXPqrlxWG6bA	2023-10-11 13:36:17.920954-05	2023-10-12 13:36:17-05	1	3859b836b31c4b61b69d37de74001440
3	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTY5ODA3NDA5NiwiaWF0IjoxNjk3OTg3Njk2LCJqdGkiOiIzZDlhODBiZjYwODY0YWQwODQ5M2JkZjZiZTYzZDVkYSIsInVzZXJfaWQiOjF9.28P7BAvrJlrTUCKMNYpJOx_zJuuc1yYnWH3sD2Eqh0M	2023-10-22 10:14:56.983154-05	2023-10-23 10:14:56-05	1	3d9a80bf60864ad08493bdf6be63d5da
4	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcwMTk5MjkxOCwiaWF0IjoxNzAxOTA2NTE4LCJqdGkiOiI5NmRmNzM0OTZkODQ0YWI2YjIxM2U4NWUwYWQ4Yjg2MCIsInVzZXJfaWQiOjF9.VAhwy6qXLMftV485aBE6Bvgyjqj43I5OvgyAq6qQtUY	2023-12-06 18:48:38.99438-05	2023-12-07 18:48:38-05	1	96df73496d844ab6b213e85e0ad8b860
5	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcwMTk5MzMyMiwiaWF0IjoxNzAxOTA2OTIyLCJqdGkiOiJkM2M1M2I2ZDc0NzA0ZDBkYTM2YmQ4OWM1NzdmMjQ4NSIsInVzZXJfaWQiOjF9.hdSiVBtXbiUXz6njARaZI_oyTHQ478d0Nrxx9NZb6Jg	2023-12-06 18:55:22.97325-05	2023-12-07 18:55:22-05	1	d3c53b6d74704d0da36bd89c577f2485
6	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcwMjM1MDkxNywiaWF0IjoxNzAyMjY0NTE3LCJqdGkiOiJhMWNhNmQ3ODBjMjA0OTcyYjg5MDM5NTZjODI1OTk2OSIsInVzZXJfaWQiOjF9.x2_guouIvoeEp6-B-5WyA9wfH4LZMTvSM0iJb91j8Bk	2023-12-10 22:15:17.899295-05	2023-12-11 22:15:17-05	1	a1ca6d780c204972b8903956c8259969
7	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcwMjM1MTYxMywiaWF0IjoxNzAyMjY1MjEzLCJqdGkiOiI4NGYyN2QwOWQ4YmY0MDk1YmU3ZDYyMjg5YjUwYzEwNyIsInVzZXJfaWQiOjEzfQ.8lFZ3pZ-nXD2I8n5hLsUj-ZMyr8eUaSdtpvW1V2axk8	2023-12-10 22:26:53.761826-05	2023-12-11 22:26:53-05	13	84f27d09d8bf4095be7d62289b50c107
8	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcwMjM1MTc0MSwiaWF0IjoxNzAyMjY1MzQxLCJqdGkiOiIyMDM3Y2M2ZWMzN2M0MmM2OTU2ZTE3MDdiMThiMWQzZSIsInVzZXJfaWQiOjE0fQ.rjkgn--GCPgw6aHJhCuWV4i6FoI3NMGBVLGCr0iBKGk	2023-12-10 22:29:01.159321-05	2023-12-11 22:29:01-05	14	2037cc6ec37c42c6956e1707b18b1d3e
9	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcwMjM1MTc1MSwiaWF0IjoxNzAyMjY1MzUxLCJqdGkiOiIzZGRkOTg1ZjBiZmI0NzViYTc2ZDJjZjQ0ZjBlZTdlMiIsInVzZXJfaWQiOjE0fQ.y9_cD7ExPxrlZ4ovLJdLig9FGqBOqeQE7uDd9PeGbI8	2023-12-10 22:29:11.449476-05	2023-12-11 22:29:11-05	14	3ddd985f0bfb475ba76d2cf44f0ee7e2
10	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcwMjM1MTc5OCwiaWF0IjoxNzAyMjY1Mzk4LCJqdGkiOiI5ZjY1NTM4ZTE5YWI0NWIwOWUyMDliNDIxOGVjZWQyZSIsInVzZXJfaWQiOjE0fQ.vP5oiygqybu9eWGFWm-k_FSUnGl8cIEkBriHfT_YU4A	2023-12-10 22:29:58.085154-05	2023-12-11 22:29:58-05	14	9f65538e19ab45b09e209b4218eced2e
11	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcwMjM1MTgzNCwiaWF0IjoxNzAyMjY1NDM0LCJqdGkiOiI0ZTdhNWRmNTZjYWI0NDM2ODlhOGJlYmRlZWI4Zjc2OCIsInVzZXJfaWQiOjE0fQ.cGYZRQS4Ss3gqyg0nP3KSLeagDt0F_B_lWudESpLXao	2023-12-10 22:30:34.523695-05	2023-12-11 22:30:34-05	14	4e7a5df56cab443689a8bebdeeb8f768
12	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcwMjM1MTk2NywiaWF0IjoxNzAyMjY1NTY3LCJqdGkiOiJkZjliMGYyNGZkNDc0NDUwOTk3NTE3ODc2ZWNiZWRiMCIsInVzZXJfaWQiOjF9.49YWzpJjCC9mfl9Wxou029XWxnnieu57O1xKuswBjpE	2023-12-10 22:32:47.387741-05	2023-12-11 22:32:47-05	1	df9b0f24fd474450997517876ecbedb0
13	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcwMjM1MjAxMCwiaWF0IjoxNzAyMjY1NjEwLCJqdGkiOiIyZTJmYWYxOTExYmM0N2UzOTI0Yjk5OWUzNjdhNjI5ZCIsInVzZXJfaWQiOjE0fQ.tOGLnU8T_NcYorKUnfZxh3JFNbLn2vOt3VeQvO9iiqE	2023-12-10 22:33:30.508507-05	2023-12-11 22:33:30-05	14	2e2faf1911bc47e3924b999e367a629d
14	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcwMjM1NDI2MCwiaWF0IjoxNzAyMjY3ODYwLCJqdGkiOiJmOTBjMTA4ZDQ3MGQ0MWNmOGY2YzNhMmU4ZWUyMDk1ZSIsInVzZXJfaWQiOjF9.tRCzAwTJwOKjd9jSBnICfL2ZU5PqxuJMG7J4og2W-YU	2023-12-10 23:11:00.692321-05	2023-12-11 23:11:00-05	1	f90c108d470d41cf8f6c3a2e8ee2095e
15	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcwMjM1NDc0MSwiaWF0IjoxNzAyMjY4MzQxLCJqdGkiOiIzYzVkYTE0N2VmMzE0OGE4OTc0ZDFlY2NhOTQ4YTViNSIsInVzZXJfaWQiOjF9.ND_-DzYpeirdwkn1dbfGM2Yy9UXdRdqbgjpoKvkMlpk	2023-12-10 23:19:01.059383-05	2023-12-11 23:19:01-05	1	3c5da147ef3148a8974d1ecca948a5b5
16	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcwMjM1NDgzMywiaWF0IjoxNzAyMjY4NDMzLCJqdGkiOiI5M2EwY2QzMzJkNjc0MzA0YWRjNWU2MGM2NDZhNTBlOSIsInVzZXJfaWQiOjF9.mN6lRm7TRbxQdJBjhKNWoh9KOLRjGUGmqHSesxM4LI0	2023-12-10 23:20:33.082698-05	2023-12-11 23:20:33-05	1	93a0cd332d674304adc5e60c646a50e9
17	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcwMjM1NTQxNywiaWF0IjoxNzAyMjY5MDE3LCJqdGkiOiI0MzY1ZGI4OTk5OWE0MjVmOWNhZmNmYjBlYTE4Y2M5NCIsInVzZXJfaWQiOjF9.l6GmMO4-4JmRnFoTgjB7A-UmA4jlcbJs5p0sR3CTDAk	2023-12-10 23:30:17.478449-05	2023-12-11 23:30:17-05	1	4365db89999a425f9cafcfb0ea18cc94
18	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcwMjM1NTY3NiwiaWF0IjoxNzAyMjY5Mjc2LCJqdGkiOiI1YmZjN2Y4MjRkYjU0ZTQwOTdhMDM2N2U1MjA4OGNlMSIsInVzZXJfaWQiOjF9.TWD1fBDsZ0U8O3JbOpL92V29BB0VzSTgdNJ-Ji9RZTo	2023-12-10 23:34:36.138252-05	2023-12-11 23:34:36-05	1	5bfc7f824db54e4097a0367e52088ce1
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
5	ASESOR_B	0	-1	2023-10-11 13:41:07.994231-05	2023-10-22 20:36:40.775033-05	A	8
6	ASESOR_C	0	10	2023-10-11 13:41:16.896662-05	2023-10-22 20:36:46.431552-05	A	9
4	ASESOR_A	0	10	2023-10-11 13:40:56.615997-05	2023-12-10 22:36:49.829904-05	A	7
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
-- Data for Name: ventas_tipoevento; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.ventas_tipoevento (id, nombre, estado_id) FROM stdin;
\.


--
-- Data for Name: ventas_evento; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.ventas_evento (id, titulo, duracion, fecha_visita, ubicacion, descripcion, asesor_id, estado_id, proyecto_id, tipo_id) FROM stdin;
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

COPY public.ventas_lead (id, nombre, apellido, asignado, celular, celular2, comentario, "horaEntrega", "horaRecepcion", llamar, asesor_id, campania_id, estado_id, "estadoLead_id", objecion_id) FROM stdin;
59	Jesus		t	987123544			2023-10-22 20:16:42.759802-05	2023-10-05 00:00:00-05	t	6	7	A	EP	1
60			t	987123549			2023-10-22 20:16:42.760825-05	2023-10-22 20:16:42.719326-05	t	5	7	A	EP	1
61			t	973451234			2023-10-22 20:16:42.764556-05	2023-10-22 20:16:42.722041-05	t	6	8	A	EP	1
62			t	973451233			2023-10-22 20:16:42.766625-05	2023-10-22 20:16:42.726457-05	t	5	8	A	EP	1
63	Juan	Reynoso	t	984512312			2023-10-22 20:20:46.890163-05	2023-10-06 00:00:00-05	t	5	8	A	EP	1
65	Julian	Alavarez	f	993913299			2023-10-22 20:20:46.957541-05	2023-10-08 00:00:00-05	t	\N	7	A	EP	1
64	Oliver	Sone	f	983838133			2023-10-22 20:20:46.935649-05	2023-10-08 00:00:00-05	t	\N	7	A	EP	1
58	Andrew	Jacobo Castillo	t	970455267		Pidio un asesor personal	2023-10-22 20:16:42.745117-05	2023-10-04 00:00:00-05	t	5	8	I	EP	1
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

SELECT pg_catalog.setval('public.auth_group_permissions_id_seq', 54, true);


--
-- Name: auth_permission_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.auth_permission_id_seq', 88, true);


--
-- Name: cuenta_modulo_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.cuenta_modulo_id_seq', 7, true);


--
-- Name: cuenta_profile_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.cuenta_profile_id_seq', 1, false);


--
-- Name: cuenta_user_groups_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.cuenta_user_groups_id_seq', 20, true);


--
-- Name: cuenta_user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.cuenta_user_id_seq', 14, true);


--
-- Name: cuenta_user_user_permissions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.cuenta_user_user_permissions_id_seq', 1, false);


--
-- Name: django_admin_log_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.django_admin_log_id_seq', 117, true);


--
-- Name: django_content_type_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.django_content_type_id_seq', 22, true);


--
-- Name: django_migrations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.django_migrations_id_seq', 42, true);


--
-- Name: marketing_campania_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.marketing_campania_id_seq', 8, true);


--
-- Name: marketing_categoria_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.marketing_categoria_id_seq', 4, true);


--
-- Name: marketing_proyecto_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.marketing_proyecto_id_seq', 3, true);


--
-- Name: token_blacklist_blacklistedtoken_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.token_blacklist_blacklistedtoken_id_seq', 1, false);


--
-- Name: token_blacklist_outstandingtoken_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.token_blacklist_outstandingtoken_id_seq', 18, true);


--
-- Name: ventas_asesor_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.ventas_asesor_id_seq', 6, true);


--
-- Name: ventas_evento_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.ventas_evento_id_seq', 1, false);


--
-- Name: ventas_lead_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.ventas_lead_id_seq', 65, true);


--
-- Name: ventas_llamada_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.ventas_llamada_id_seq', 1, false);


--
-- Name: ventas_objecion_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.ventas_objecion_id_seq', 10, true);


--
-- Name: ventas_tipoevento_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.ventas_tipoevento_id_seq', 1, false);


--
-- Name: ventas_whatsapp_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.ventas_whatsapp_id_seq', 1, false);


--
-- PostgreSQL database dump complete
--

