import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Query,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ControllerEnum } from 'src/enums/controllerEnum';
import { SkipAuth } from './decorators/skipAuthDecorator';
import { RegisterAuthReqDto } from './dto/req/register.auth.req.dto';
import { AuthResDto } from './dto/res/auth.res.dto';
import { AuthService } from './auth.service';
import { LoginReqDto } from './dto/req/loginReq.dto';
import { JwtRefreshGuard } from './quards/jwtRefrGuard';
import { ReqAfterGuardDto } from './dto/req/reqAfterGuard.dto';
import { TokenPair } from 'src/models/tokenPair';
import { CurrentUser } from './decorators/currentUserDecorator';
import { GoogleAuthGuard } from './quards/GoogleAuthGuard';
import { JwtAccessGuard } from './quards/jwtAccesGuard';

@ApiTags(ControllerEnum.AUTH)
@Controller(ControllerEnum.AUTH)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'register user' })
  @SkipAuth()
  @Post('register')
  public async register(
    @Body() registerAuthDto: RegisterAuthReqDto,
  ): Promise<AuthResDto> {
    return this.authService.register(registerAuthDto);
  }

  @ApiOperation({ summary: 'login' })
  @SkipAuth()
  @Post('login')
  public async login(@Body() loginAuthDto: LoginReqDto): Promise<AuthResDto> {
    return await this.authService.login(loginAuthDto);
  }

  @ApiOperation({ summary: 'Refresh Tokens' })
  @ApiBearerAuth()
  @UseGuards(JwtRefreshGuard)
  @SkipAuth()
  @Post('refresh')
  public async refresh(
    @CurrentUser() userData: ReqAfterGuardDto,
  ): Promise<TokenPair> {
    return await this.authService.refresh(userData);
  }

  @ApiOperation({ summary: 'Logout from devices' })
  @ApiBearerAuth()
  @UseGuards(JwtAccessGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  @Post('logout')
  public async logOut(
    @CurrentUser() userData: ReqAfterGuardDto,
  ): Promise<void> {
    await this.authService.logout(userData);
  }

  @ApiOperation({ summary: 'Verify created user' })
  @ApiBearerAuth()
  @Post('verify')
  public async verifyUser(@Query('token') token: string): Promise<string> {
    return await this.authService.verifyUser(token);
  }

  @ApiOperation({ summary: 'google login' })
  @Get('google')
  @SkipAuth()
  @UseGuards(GoogleAuthGuard)
  async googleAuth() {}

  @ApiOperation({ summary: 'google callback' })
  @Get('google/callback')
  @SkipAuth()
  @UseGuards(GoogleAuthGuard)
  async googleAuthRedirect(@Req() req, @Res() res: Response): Promise<void> {
    const { tokens, user } = await this.authService.googleLogin(req.user);
    return res.redirect(
      `http://localhost/auth/callback?accessToken=${tokens.accessToken}&refreshToken=${tokens.refreshToken}&user=${JSON.stringify(user)}`,
    );
  }
}
