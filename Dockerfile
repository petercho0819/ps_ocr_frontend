# 빌드 스테이지
FROM node:18-alpine AS builder
WORKDIR /app

# 패키지 파일 복사 및 종속성 설치
COPY package*.json ./
RUN npm ci

# 전체 프로젝트 복사
COPY . .

# ESLint 경고를 무시하고 빌드 실행
RUN npm run build
# 프로덕션 스테이지
FROM node:18-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production

# 전체 프로젝트 복사
COPY --from=builder /app ./

EXPOSE 3000

CMD ["npm", "start"]