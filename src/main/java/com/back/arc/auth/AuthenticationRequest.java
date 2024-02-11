package com.back.arc.auth;

import lombok.*;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AuthenticationRequest {

  private String email;
  String password;

    @Getter
    @Setter
    @Builder
    public static class ChangePasswordRequest {

        private String currentPassword;
        private String newPassword;
        private String confirmationPassword;
    }
}
