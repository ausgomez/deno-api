FROM hayd/alpine-deno:latest

RUN deno install -qAf --no-check --unstable https://deno.land/x/denon/denon.ts

EXPOSE 8000
USER deno

WORKDIR /app

ADD . /app

RUN deno cache --no-check --unstable server.ts
RUN deno cache --no-check --unstable /deps/*.ts

ENTRYPOINT [ "/usr/local/bin/denon" ]

CMD ["run", "--no-check", "--allow-read", "--allow-write", "--allow-env", "--unstable", "--allow-net", "server.ts"]