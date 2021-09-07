FROM hayd/alpine-deno:latest

EXPOSE 8000

WORKDIR /app

ADD . /app

RUN deno cache server.ts
RUN deno cache /deps/*.ts


CMD ["run", "--allow-read", "--allow-write", "--allow-env", "--unstable", "--allow-net", "server.ts"]