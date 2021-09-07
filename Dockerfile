FROM hayd/ubuntu-deno:latest

# RUN deno install -qAf --no-check --unstable https://deno.land/x/denon/denon.ts

EXPOSE 8000

USER deno

WORKDIR /app

ADD . /app

RUN deno cache --no-check --unstable /deps/bcrypt.ts
RUN deno cache --no-check --unstable /deps/djwt.ts
RUN deno cache --no-check --unstable /deps/denodb.ts
RUN deno cache --no-check --unstable /deps/oak.ts

# COPY . .

RUN deno cache --no-check --unstable server.ts

# ENTRYPOINT [ "/usr/local/bin/denon" ]

CMD ["run", "--no-check", "--allow-read", "--allow-write", "--allow-env", "--unstable", "--allow-net", "server.ts"]