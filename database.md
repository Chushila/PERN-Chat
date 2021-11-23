

CREATE TABLE public.contacts (
    user_id text NOT NULL,
    contact_user_id text NOT NULL,
    name text NOT NULL
);



CREATE TABLE public.conversation_users (
    conversation_id uuid NOT NULL,
    user_id text NOT NULL
);


CREATE TABLE public.conversations (
    id uuid NOT NULL
);



CREATE TABLE public.messages (
    conversation_id uuid NOT NULL,
    text text NOT NULL,
    date timestamp with time zone NOT NULL,
    user_id text NOT NULL
);




CREATE TABLE public.users (
    id text NOT NULL
);


ALTER TABLE ONLY public.contacts
    ADD CONSTRAINT contacts_pkey PRIMARY KEY (user_id, contact_user_id);




ALTER TABLE ONLY public.conversation_users
    ADD CONSTRAINT conversation_users_pkey PRIMARY KEY (user_id, conversation_id);



ALTER TABLE ONLY public.conversations
    ADD CONSTRAINT conversations_pkey PRIMARY KEY (id);




ALTER TABLE ONLY public.messages
    ADD CONSTRAINT messages_pkey PRIMARY KEY (conversation_id, date);



ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);



ALTER TABLE ONLY public.contacts
    ADD CONSTRAINT contacts_contact_user_id_fkey FOREIGN KEY (contact_user_id) REFERENCES public.users(id);



ALTER TABLE ONLY public.contacts
    ADD CONSTRAINT contacts_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id);



ALTER TABLE ONLY public.conversation_users
    ADD CONSTRAINT conversation_users_conversation_id_fkey FOREIGN KEY (conversation_id) REFERENCES public.conversations(id);




ALTER TABLE ONLY public.conversation_users
    ADD CONSTRAINT conversation_users_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id);



ALTER TABLE ONLY public.messages
    ADD CONSTRAINT messages_conversation_id_fkey FOREIGN KEY (conversation_id) REFERENCES public.conversations(id);



ALTER TABLE ONLY public.messages
    ADD CONSTRAINT messages_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id);

