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

  @Get('google')
  @SkipAuth()
  @UseGuards(GoogleAuthGuard)
  async googleAuth() {}

  @Get('google/callback')
  @SkipAuth()
  @UseGuards(GoogleAuthGuard)
  async googleAuthRedirect(@Req() req, @Res() res) {
    console.log(req);
    const { accessToken } = await this.authService.googleLogin(req.user);
    res.cookie('access_token', accessToken, {
      maxAge: 2592000000,
      sameSite: true,
      secure: false,
    });
    // res.redirect(this.linkToRedirect.getLink());
  }
}
