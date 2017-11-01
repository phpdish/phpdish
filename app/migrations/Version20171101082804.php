<?php

namespace PHPDish\Migrations;

use Doctrine\DBAL\Migrations\AbstractMigration;
use Doctrine\DBAL\Schema\Schema;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
class Version20171101082804 extends AbstractMigration
{
    /**
     * @param Schema $schema
     */
    public function up(Schema $schema)
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('CREATE TABLE friend_links (id INT AUTO_INCREMENT NOT NULL, name VARCHAR(50) NOT NULL, url VARCHAR(255) NOT NULL, logo VARCHAR(255) NOT NULL, priority INT NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB');
        $this->addSql('CREATE TABLE profiles (id INT AUTO_INCREMENT NOT NULL, user_id INT DEFAULT NULL, url VARCHAR(255) DEFAULT NULL, company VARCHAR(255) DEFAULT NULL, location VARCHAR(255) DEFAULT NULL, UNIQUE INDEX UNIQ_8B308530A76ED395 (user_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB');
        $this->addSql('CREATE TABLE roles (id INT AUTO_INCREMENT NOT NULL, name VARCHAR(255) NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB');
        $this->addSql('CREATE TABLE users (id INT AUTO_INCREMENT NOT NULL, username VARCHAR(180) NOT NULL, username_canonical VARCHAR(180) NOT NULL, email VARCHAR(180) NOT NULL, email_canonical VARCHAR(180) NOT NULL, enabled TINYINT(1) NOT NULL, salt VARCHAR(255) DEFAULT NULL, password VARCHAR(255) NOT NULL, last_login DATETIME DEFAULT NULL, confirmation_token VARCHAR(180) DEFAULT NULL, password_requested_at DATETIME DEFAULT NULL, roles LONGTEXT NOT NULL COMMENT \'(DC2Type:array)\', gender SMALLINT NOT NULL, description VARCHAR(255) NOT NULL, avatar VARCHAR(255) NOT NULL, following_count INT NOT NULL, follower_count INT NOT NULL, post_count INT NOT NULL, topic_count INT NOT NULL, weibo_id VARCHAR(255) DEFAULT NULL, weibo_access_token VARCHAR(500) DEFAULT NULL, github_id VARCHAR(255) DEFAULT NULL, github_access_token VARCHAR(500) DEFAULT NULL, created_at DATETIME NOT NULL, updated_at DATETIME NOT NULL, UNIQUE INDEX UNIQ_1483A5E992FC23A8 (username_canonical), UNIQUE INDEX UNIQ_1483A5E9A0D96FBF (email_canonical), UNIQUE INDEX UNIQ_1483A5E9C05FB297 (confirmation_token), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB');
        $this->addSql('CREATE TABLE users_followers (user_id INT NOT NULL, follower_id INT NOT NULL, INDEX IDX_E2758746A76ED395 (user_id), INDEX IDX_E2758746AC24F853 (follower_id), PRIMARY KEY(user_id, follower_id)) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB');
        $this->addSql('CREATE TABLE categories (id INT AUTO_INCREMENT NOT NULL, user_id INT DEFAULT NULL, cover VARCHAR(255) NOT NULL, recommended TINYINT(1) NOT NULL, post_count INT NOT NULL, follower_count INT NOT NULL, name VARCHAR(100) NOT NULL, slug VARCHAR(200) NOT NULL, description LONGTEXT NOT NULL, created_at DATETIME NOT NULL, updated_at DATETIME NOT NULL, enabled TINYINT(1) NOT NULL, INDEX IDX_3AF34668A76ED395 (user_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB');
        $this->addSql('CREATE TABLE categories_followers (category_id INT NOT NULL, user_id INT NOT NULL, INDEX IDX_DBDB8B0612469DE2 (category_id), INDEX IDX_DBDB8B06A76ED395 (user_id), PRIMARY KEY(category_id, user_id)) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB');
        $this->addSql('CREATE TABLE categories_managers (category_id INT NOT NULL, user_id INT NOT NULL, INDEX IDX_7FB7493F12469DE2 (category_id), UNIQUE INDEX UNIQ_7FB7493FA76ED395 (user_id), PRIMARY KEY(category_id, user_id)) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB');
        $this->addSql('CREATE TABLE comments (id INT AUTO_INCREMENT NOT NULL, post_id INT DEFAULT NULL, user_id INT DEFAULT NULL, body LONGTEXT NOT NULL, original_body LONGTEXT NOT NULL, created_at DATETIME NOT NULL, updated_at DATETIME NOT NULL, enabled TINYINT(1) NOT NULL, vote_count INT NOT NULL, INDEX IDX_5F9E962A4B89032C (post_id), INDEX IDX_5F9E962AA76ED395 (user_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB');
        $this->addSql('CREATE TABLE posts (id INT AUTO_INCREMENT NOT NULL, user_id INT DEFAULT NULL, category_id INT DEFAULT NULL, title VARCHAR(150) NOT NULL, cover VARCHAR(255) DEFAULT NULL, recommended TINYINT(1) NOT NULL, comment_count INT DEFAULT 0, view_count INT DEFAULT 0, body LONGTEXT NOT NULL, original_body LONGTEXT NOT NULL, created_at DATETIME NOT NULL, updated_at DATETIME NOT NULL, vote_count INT NOT NULL, enabled TINYINT(1) NOT NULL, INDEX IDX_885DBAFAA76ED395 (user_id), INDEX IDX_885DBAFA12469DE2 (category_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB');
        $this->addSql('CREATE TABLE topic_replies (id INT AUTO_INCREMENT NOT NULL, user_id INT DEFAULT NULL, topic_id INT DEFAULT NULL, body LONGTEXT NOT NULL, original_body LONGTEXT NOT NULL, created_at DATETIME NOT NULL, updated_at DATETIME NOT NULL, enabled TINYINT(1) NOT NULL, vote_count INT NOT NULL, INDEX IDX_28AB3AFFA76ED395 (user_id), INDEX IDX_28AB3AFF1F55203D (topic_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB');
        $this->addSql('CREATE TABLE threads (id INT AUTO_INCREMENT NOT NULL, name VARCHAR(100) NOT NULL, slug VARCHAR(200) NOT NULL, description LONGTEXT NOT NULL, created_at DATETIME NOT NULL, updated_at DATETIME NOT NULL, enabled TINYINT(1) NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB');
        $this->addSql('CREATE TABLE topics (id INT AUTO_INCREMENT NOT NULL, user_id INT DEFAULT NULL, thread_id INT DEFAULT NULL, last_reply_user_id INT DEFAULT NULL, title VARCHAR(255) NOT NULL, replied_at DATETIME NOT NULL, reply_count INT NOT NULL, recommended TINYINT(1) NOT NULL, stick_top TINYINT(1) NOT NULL, body LONGTEXT NOT NULL, original_body LONGTEXT NOT NULL, comment_count INT NOT NULL, created_at DATETIME NOT NULL, updated_at DATETIME NOT NULL, enabled TINYINT(1) NOT NULL, vote_count INT NOT NULL, INDEX IDX_91F64639A76ED395 (user_id), INDEX IDX_91F64639E2904019 (thread_id), INDEX IDX_91F64639D6DFD9C0 (last_reply_user_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB');
        $this->addSql('CREATE TABLE notifications (id INT AUTO_INCREMENT NOT NULL, user_id INT DEFAULT NULL, from_user_id INT DEFAULT NULL, topic_id INT DEFAULT NULL, reply_id INT DEFAULT NULL, post_id INT DEFAULT NULL, comment_id INT DEFAULT NULL, category_id INT DEFAULT NULL, subject VARCHAR(255) NOT NULL, message VARCHAR(255) DEFAULT NULL, created_at DATETIME NOT NULL, seen TINYINT(1) NOT NULL, INDEX IDX_6000B0D3A76ED395 (user_id), INDEX IDX_6000B0D32130303A (from_user_id), INDEX IDX_6000B0D31F55203D (topic_id), INDEX IDX_6000B0D38A0E4E7F (reply_id), INDEX IDX_6000B0D34B89032C (post_id), INDEX IDX_6000B0D3F8697D13 (comment_id), INDEX IDX_6000B0D312469DE2 (category_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB');
        $this->addSql('CREATE TABLE messages (id INT AUTO_INCREMENT NOT NULL, thread_id INT DEFAULT NULL, sender_id INT DEFAULT NULL, body LONGTEXT NOT NULL, created_at DATETIME NOT NULL, INDEX IDX_DB021E96E2904019 (thread_id), INDEX IDX_DB021E96F624B39D (sender_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB');
        $this->addSql('CREATE TABLE message_metadata (id INT AUTO_INCREMENT NOT NULL, message_id INT DEFAULT NULL, participant_id INT DEFAULT NULL, is_read TINYINT(1) NOT NULL, INDEX IDX_4632F005537A1329 (message_id), INDEX IDX_4632F0059D1C3019 (participant_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB');
        $this->addSql('CREATE TABLE message_threads (id INT AUTO_INCREMENT NOT NULL, created_by_id INT DEFAULT NULL, subject VARCHAR(255) NOT NULL, created_at DATETIME NOT NULL, is_spam TINYINT(1) NOT NULL, INDEX IDX_FF0607D1B03A8386 (created_by_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB');
        $this->addSql('CREATE TABLE message_thread_metadata (id INT AUTO_INCREMENT NOT NULL, thread_id INT DEFAULT NULL, participant_id INT DEFAULT NULL, is_deleted TINYINT(1) NOT NULL, last_participant_message_date DATETIME DEFAULT NULL, last_message_date DATETIME DEFAULT NULL, INDEX IDX_38FC293EE2904019 (thread_id), INDEX IDX_38FC293E9D1C3019 (participant_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB');
        $this->addSql('ALTER TABLE profiles ADD CONSTRAINT FK_8B308530A76ED395 FOREIGN KEY (user_id) REFERENCES users (id)');
        $this->addSql('ALTER TABLE users_followers ADD CONSTRAINT FK_E2758746A76ED395 FOREIGN KEY (user_id) REFERENCES users (id)');
        $this->addSql('ALTER TABLE users_followers ADD CONSTRAINT FK_E2758746AC24F853 FOREIGN KEY (follower_id) REFERENCES users (id)');
        $this->addSql('ALTER TABLE categories ADD CONSTRAINT FK_3AF34668A76ED395 FOREIGN KEY (user_id) REFERENCES users (id)');
        $this->addSql('ALTER TABLE categories_followers ADD CONSTRAINT FK_DBDB8B0612469DE2 FOREIGN KEY (category_id) REFERENCES categories (id)');
        $this->addSql('ALTER TABLE categories_followers ADD CONSTRAINT FK_DBDB8B06A76ED395 FOREIGN KEY (user_id) REFERENCES users (id)');
        $this->addSql('ALTER TABLE categories_managers ADD CONSTRAINT FK_7FB7493F12469DE2 FOREIGN KEY (category_id) REFERENCES categories (id)');
        $this->addSql('ALTER TABLE categories_managers ADD CONSTRAINT FK_7FB7493FA76ED395 FOREIGN KEY (user_id) REFERENCES users (id)');
        $this->addSql('ALTER TABLE comments ADD CONSTRAINT FK_5F9E962A4B89032C FOREIGN KEY (post_id) REFERENCES posts (id)');
        $this->addSql('ALTER TABLE comments ADD CONSTRAINT FK_5F9E962AA76ED395 FOREIGN KEY (user_id) REFERENCES users (id)');
        $this->addSql('ALTER TABLE posts ADD CONSTRAINT FK_885DBAFAA76ED395 FOREIGN KEY (user_id) REFERENCES users (id)');
        $this->addSql('ALTER TABLE posts ADD CONSTRAINT FK_885DBAFA12469DE2 FOREIGN KEY (category_id) REFERENCES categories (id)');
        $this->addSql('ALTER TABLE topic_replies ADD CONSTRAINT FK_28AB3AFFA76ED395 FOREIGN KEY (user_id) REFERENCES users (id)');
        $this->addSql('ALTER TABLE topic_replies ADD CONSTRAINT FK_28AB3AFF1F55203D FOREIGN KEY (topic_id) REFERENCES topics (id)');
        $this->addSql('ALTER TABLE topics ADD CONSTRAINT FK_91F64639A76ED395 FOREIGN KEY (user_id) REFERENCES users (id)');
        $this->addSql('ALTER TABLE topics ADD CONSTRAINT FK_91F64639E2904019 FOREIGN KEY (thread_id) REFERENCES threads (id)');
        $this->addSql('ALTER TABLE topics ADD CONSTRAINT FK_91F64639D6DFD9C0 FOREIGN KEY (last_reply_user_id) REFERENCES users (id)');
        $this->addSql('ALTER TABLE notifications ADD CONSTRAINT FK_6000B0D3A76ED395 FOREIGN KEY (user_id) REFERENCES users (id)');
        $this->addSql('ALTER TABLE notifications ADD CONSTRAINT FK_6000B0D32130303A FOREIGN KEY (from_user_id) REFERENCES users (id)');
        $this->addSql('ALTER TABLE notifications ADD CONSTRAINT FK_6000B0D31F55203D FOREIGN KEY (topic_id) REFERENCES topics (id)');
        $this->addSql('ALTER TABLE notifications ADD CONSTRAINT FK_6000B0D38A0E4E7F FOREIGN KEY (reply_id) REFERENCES topic_replies (id)');
        $this->addSql('ALTER TABLE notifications ADD CONSTRAINT FK_6000B0D34B89032C FOREIGN KEY (post_id) REFERENCES posts (id)');
        $this->addSql('ALTER TABLE notifications ADD CONSTRAINT FK_6000B0D3F8697D13 FOREIGN KEY (comment_id) REFERENCES comments (id)');
        $this->addSql('ALTER TABLE notifications ADD CONSTRAINT FK_6000B0D312469DE2 FOREIGN KEY (category_id) REFERENCES categories (id)');
        $this->addSql('ALTER TABLE messages ADD CONSTRAINT FK_DB021E96E2904019 FOREIGN KEY (thread_id) REFERENCES message_threads (id)');
        $this->addSql('ALTER TABLE messages ADD CONSTRAINT FK_DB021E96F624B39D FOREIGN KEY (sender_id) REFERENCES users (id)');
        $this->addSql('ALTER TABLE message_metadata ADD CONSTRAINT FK_4632F005537A1329 FOREIGN KEY (message_id) REFERENCES messages (id)');
        $this->addSql('ALTER TABLE message_metadata ADD CONSTRAINT FK_4632F0059D1C3019 FOREIGN KEY (participant_id) REFERENCES users (id)');
        $this->addSql('ALTER TABLE message_threads ADD CONSTRAINT FK_FF0607D1B03A8386 FOREIGN KEY (created_by_id) REFERENCES users (id)');
        $this->addSql('ALTER TABLE message_thread_metadata ADD CONSTRAINT FK_38FC293EE2904019 FOREIGN KEY (thread_id) REFERENCES message_threads (id)');
        $this->addSql('ALTER TABLE message_thread_metadata ADD CONSTRAINT FK_38FC293E9D1C3019 FOREIGN KEY (participant_id) REFERENCES users (id)');
    }

    /**
     * @param Schema $schema
     */
    public function down(Schema $schema)
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE profiles DROP FOREIGN KEY FK_8B308530A76ED395');
        $this->addSql('ALTER TABLE users_followers DROP FOREIGN KEY FK_E2758746A76ED395');
        $this->addSql('ALTER TABLE users_followers DROP FOREIGN KEY FK_E2758746AC24F853');
        $this->addSql('ALTER TABLE categories DROP FOREIGN KEY FK_3AF34668A76ED395');
        $this->addSql('ALTER TABLE categories_followers DROP FOREIGN KEY FK_DBDB8B06A76ED395');
        $this->addSql('ALTER TABLE categories_managers DROP FOREIGN KEY FK_7FB7493FA76ED395');
        $this->addSql('ALTER TABLE comments DROP FOREIGN KEY FK_5F9E962AA76ED395');
        $this->addSql('ALTER TABLE posts DROP FOREIGN KEY FK_885DBAFAA76ED395');
        $this->addSql('ALTER TABLE topic_replies DROP FOREIGN KEY FK_28AB3AFFA76ED395');
        $this->addSql('ALTER TABLE topics DROP FOREIGN KEY FK_91F64639A76ED395');
        $this->addSql('ALTER TABLE topics DROP FOREIGN KEY FK_91F64639D6DFD9C0');
        $this->addSql('ALTER TABLE notifications DROP FOREIGN KEY FK_6000B0D3A76ED395');
        $this->addSql('ALTER TABLE notifications DROP FOREIGN KEY FK_6000B0D32130303A');
        $this->addSql('ALTER TABLE messages DROP FOREIGN KEY FK_DB021E96F624B39D');
        $this->addSql('ALTER TABLE message_metadata DROP FOREIGN KEY FK_4632F0059D1C3019');
        $this->addSql('ALTER TABLE message_threads DROP FOREIGN KEY FK_FF0607D1B03A8386');
        $this->addSql('ALTER TABLE message_thread_metadata DROP FOREIGN KEY FK_38FC293E9D1C3019');
        $this->addSql('ALTER TABLE categories_followers DROP FOREIGN KEY FK_DBDB8B0612469DE2');
        $this->addSql('ALTER TABLE categories_managers DROP FOREIGN KEY FK_7FB7493F12469DE2');
        $this->addSql('ALTER TABLE posts DROP FOREIGN KEY FK_885DBAFA12469DE2');
        $this->addSql('ALTER TABLE notifications DROP FOREIGN KEY FK_6000B0D312469DE2');
        $this->addSql('ALTER TABLE notifications DROP FOREIGN KEY FK_6000B0D3F8697D13');
        $this->addSql('ALTER TABLE comments DROP FOREIGN KEY FK_5F9E962A4B89032C');
        $this->addSql('ALTER TABLE notifications DROP FOREIGN KEY FK_6000B0D34B89032C');
        $this->addSql('ALTER TABLE notifications DROP FOREIGN KEY FK_6000B0D38A0E4E7F');
        $this->addSql('ALTER TABLE topics DROP FOREIGN KEY FK_91F64639E2904019');
        $this->addSql('ALTER TABLE topic_replies DROP FOREIGN KEY FK_28AB3AFF1F55203D');
        $this->addSql('ALTER TABLE notifications DROP FOREIGN KEY FK_6000B0D31F55203D');
        $this->addSql('ALTER TABLE message_metadata DROP FOREIGN KEY FK_4632F005537A1329');
        $this->addSql('ALTER TABLE messages DROP FOREIGN KEY FK_DB021E96E2904019');
        $this->addSql('ALTER TABLE message_thread_metadata DROP FOREIGN KEY FK_38FC293EE2904019');
        $this->addSql('DROP TABLE friend_links');
        $this->addSql('DROP TABLE profiles');
        $this->addSql('DROP TABLE roles');
        $this->addSql('DROP TABLE users');
        $this->addSql('DROP TABLE users_followers');
        $this->addSql('DROP TABLE categories');
        $this->addSql('DROP TABLE categories_followers');
        $this->addSql('DROP TABLE categories_managers');
        $this->addSql('DROP TABLE comments');
        $this->addSql('DROP TABLE posts');
        $this->addSql('DROP TABLE topic_replies');
        $this->addSql('DROP TABLE threads');
        $this->addSql('DROP TABLE topics');
        $this->addSql('DROP TABLE notifications');
        $this->addSql('DROP TABLE messages');
        $this->addSql('DROP TABLE message_metadata');
        $this->addSql('DROP TABLE message_threads');
        $this->addSql('DROP TABLE message_thread_metadata');
    }
}
