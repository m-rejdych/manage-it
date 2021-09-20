INSERT INTO public.project_stage (name) values ('preparation');
INSERT INTO public.project_stage (name) values ('open');
INSERT INTO public.project_stage (name) values ('progress');
INSERT INTO public.project_stage (name) values ('closed');

INSERT INTO public.task_type (name) values ('bug');
INSERT INTO public.task_type (name) values ('task');
INSERT INTO public.task_type (name) values ('improvement');
INSERT INTO public.task_type (name) values ('problem');

INSERT INTO public.task_priority (name) values ('minor');
INSERT INTO public.task_priority (name) values ('major');
INSERT INTO public.task_priority (name) values ('critical');
INSERT INTO public.task_priority (name) values ('nice-to-have');