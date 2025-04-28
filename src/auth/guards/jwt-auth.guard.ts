import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
// Exemple : check d'un token dans les headers
// autorise si un token est présent( // extrait le token depuis "Authorization: Bearer <token>")dans la strategy
//@UseGuards(JwtAuthGuard) // protège cette route  dans la controllers de users
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}
